import { requestAccess, getAddress, isConnected, signTransaction } from "@stellar/freighter-api";
import { Contract, rpc as SorobanRpc, Networks, TransactionBuilder, BASE_FEE, nativeToScVal, scValToNative, Account, TimeoutInfinite } from "@stellar/stellar-sdk";

export const CONTRACT_ID = "CAHH4V4UKWXYSGYULJFHOW5WYQQC4EN2IZIT5XCEVICMEUK5MZLDC2UI";
export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;

export async function connectFreighter() {
  const result = await isConnected();
  if (!result.isConnected) {
    throw new Error("Freighter wallet extension is not installed or not active.");
  }
  const { address, error } = await requestAccess();
  if (error) {
    throw new Error(error);
  }
  return address;
}

function getContract() {
  return new Contract(CONTRACT_ID);
}

function getServer() {
  return new SorobanRpc.Server(RPC_URL, { allowHttp: true });
}

async function sendAndPollTransaction(signedTx, server) {
  const txResp = await server.sendTransaction(signedTx);
  if (txResp.status === "ERROR") {
    throw new Error(`Transaction submission failed: ${JSON.stringify(txResp)}`);
  }
  
  // Poll until complete
  let status = "PENDING";
  let getTxResp;
  while (status === "PENDING" || status === "NOT_FOUND") {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    getTxResp = await server.getTransaction(txResp.hash);
    status = getTxResp.status;
  }
  
  if (status === "FAILED") {
    throw new Error(`Transaction failed on-chain: ${JSON.stringify(getTxResp.resultXdr)}`);
  }
  return getTxResp;
}

export async function createPoll(question, options) {
  const pubKey = await connectFreighter();
  if (!pubKey) throw new Error("Wallet not connected");
  const contract = getContract();
  const server = getServer();
  const source = await server.getAccount(pubKey);

  const questionVal = nativeToScVal(question, { type: "string" });
  const optionsVal = nativeToScVal(options, { type: "string" }); // automatically creates a vector of strings

  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("create_poll", questionVal, optionsVal))
    .setTimeout(TimeoutInfinite)
    .build();

  const sim = await server.simulateTransaction(tx);
  if (sim.error || !sim.transactionData) {
    throw new Error(`Simulation failed: ${sim.error || "Unknown error"}`);
  }

  const txWithData = TransactionBuilder.fromXDR(tx.toXDR(), NETWORK_PASSPHRASE);
  // Actually, wait, simulation adds transaction data which includes resource fees and signatures
  const preparedTx = await server.prepareTransaction(tx);

  const { signedTxXdr, error } = await signTransaction(preparedTx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  if (error) throw new Error(error);

  const signedTx = TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
  return await sendAndPollTransaction(signedTx, server);
}

export async function vote(pollId, optionIdx) {
  const pubKey = await connectFreighter();
  if (!pubKey) throw new Error("Wallet not connected");
  const contract = getContract();
  const server = getServer();
  const source = await server.getAccount(pubKey);

  const pollIdVal = nativeToScVal(pollId, { type: "u32" });
  const optionIdxVal = nativeToScVal(optionIdx, { type: "u32" });

  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("vote", pollIdVal, optionIdxVal))
    .setTimeout(TimeoutInfinite)
    .build();

  const preparedTx = await server.prepareTransaction(tx);

  const { signedTxXdr, error } = await signTransaction(preparedTx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  if (error) throw new Error(error);

  const signedTx = TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
  return await sendAndPollTransaction(signedTx, server);
}

// Dummy account for read-only operations
const DUMMY_ACCOUNT = new Account("GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF", "0");

export async function fetchPoll(pollId) {
  const contract = getContract();
  const server = getServer();

  if (pollId === "count") {
    const tx = new TransactionBuilder(DUMMY_ACCOUNT, { fee: BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE })
      .addOperation(contract.call("get_poll_count"))
      .setTimeout(30).build();
    const sim = await server.simulateTransaction(tx);
    if (!sim.result) return 0;
    return Number(scValToNative(sim.result.retval));
  }

  const tx = new TransactionBuilder(DUMMY_ACCOUNT, { fee: BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE })
    .addOperation(contract.call("get_poll", nativeToScVal(Number(pollId), { type: "u32" })))
    .setTimeout(30).build();

  const sim = await server.simulateTransaction(tx);
  if (!sim.result) throw new Error("Poll not found");

  const result = scValToNative(sim.result.retval);
  return {
    question: result.question,
    options: result.options,
    vote_counts: result.vote_counts,
  };
}

export async function fetchResults(pollId) {
  const contract = getContract();
  const server = getServer();
  const tx = new TransactionBuilder(DUMMY_ACCOUNT, { fee: BASE_FEE, networkPassphrase: NETWORK_PASSPHRASE })
    .addOperation(contract.call("get_results", nativeToScVal(Number(pollId), { type: "u32" })))
    .setTimeout(30).build();

  const sim = await server.simulateTransaction(tx);
  if (!sim.result) return [];
  return scValToNative(sim.result.retval);
}
