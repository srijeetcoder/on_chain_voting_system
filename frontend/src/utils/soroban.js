// soroban.js - Utility functions for contract interaction
import {  requestAccess, getPublicKey as getFreighterPublicKey } from "@stellar/freighter-api";
import { Contract, SorobanRpc, Networks, TransactionBuilder, BASE_FEE, Keypair } from "@stellar/stellar-sdk";

// Set your contract ID here after deployment
export const CONTRACT_ID = "<CONTRACT_ID_HERE>";
export const RPC_URL = "https://soroban-testnet.stellar.org";
export const NETWORK_PASSPHRASE = Networks.TESTNET;

// Connect to Freighter wallet and get public key
export async function connectFreighter() {
  await requestAccess(); // triggers Freighter popup
  const publicKey = await getFreighterPublicKey();
  return publicKey;
}

// Helper to get contract instance
function getContract() {
  return new Contract(CONTRACT_ID);
}

// Helper to get Soroban server
function getServer() {
  return new SorobanRpc.Server(RPC_URL, { allowHttp: true });
}

export async function createPoll(question, options) {
  const pubKey = await getPublicKey();
  if (!pubKey) throw new Error("Wallet not connected");
  const contract = getContract();
  const server = getServer();
  const source = await server.getAccount(pubKey);
  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("create_poll", {
      question,
      options,
    }))
    .setTimeout(30)
    .build();
  const signed = await window.freighterApi.signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  const txResp = await server.sendTransaction(signed);
  return txResp;
}

export async function vote(pollId, optionIdx) {
  const pubKey = await getPublicKey();
  if (!pubKey) throw new Error("Wallet not connected");
  const contract = getContract();
  const server = getServer();
  const source = await server.getAccount(pubKey);
  const tx = new TransactionBuilder(source, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call("vote", {
      poll_id: pollId,
      option_idx: optionIdx,
      voter: pubKey,
    }))
    .setTimeout(30)
    .build();
  const signed = await window.freighterApi.signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });
  const txResp = await server.sendTransaction(signed);
  return txResp;
}

export async function fetchPoll(pollId) {
  if (pollId === "count") {
    // Get poll count
    const contract = getContract();
    const server = getServer();
    const result = await server.simulateTransaction(
      contract.call("get_poll_count", {})
    );
    return Number(result.result);
  }
  const contract = getContract();
  const server = getServer();
  const result = await server.simulateTransaction(
    contract.call("get_poll", { poll_id: Number(pollId) })
  );
  // result.result is [question, options, vote_counts]
  return {
    question: result.result[0],
    options: result.result[1],
    vote_counts: result.result[2],
  };
}

export async function fetchResults(pollId) {
  const contract = getContract();
  const server = getServer();
  const result = await server.simulateTransaction(
    contract.call("get_results", { poll_id: Number(pollId) })
  );
  return result.result;
}
