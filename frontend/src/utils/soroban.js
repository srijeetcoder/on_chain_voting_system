import { requestAccess, getAddress, isConnected, signTransaction } from "@stellar/freighter-api";
import { Contract, rpc as SorobanRpc, Networks, TransactionBuilder, BASE_FEE, nativeToScVal, scValToNative, Account } from "@stellar/stellar-sdk";

export const CONTRACT_ID = "CAHVHOSPMP74CA6WGXVHBDOXLQBMDSFWT2AYUBPI67ANHG3BMTL6SM3W";
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

export async function createPoll(question, options) {
  const pubKey = await connectFreighter();
  if (!pubKey) throw new Error("Wallet not connected");
  const contract = getContract();
  const server = getServer();
  const source = await server.getAccount(pubKey);
  
  const questionVal = nativeToScVal(question, { type: "symbol" });
  const optionsVal = nativeToScVal(options, { type: "symbol" }); // automatically creates a vector of symbols

  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("create_poll", questionVal, optionsVal))
    .setTimeout(30)
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
  const txResp = await server.sendTransaction(signedTx);
  return txResp;
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
    .setTimeout(30)
    .build();

  const preparedTx = await server.prepareTransaction(tx);

  const { signedTxXdr, error } = await signTransaction(preparedTx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  if (error) throw new Error(error);

  const signedTx = TransactionBuilder.fromXDR(signedTxXdr, NETWORK_PASSPHRASE);
  const txResp = await server.sendTransaction(signedTx);
  return txResp;
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
