# On-Chain Voting System

## Project Overview

**Purpose:**
A decentralized voting dApp where polls and votes are stored on-chain using Stellar Soroban smart contracts. Ensures transparency and tamper-proof voting. No backend server is used.

**Features:**
- Create poll with question and options
- Each wallet can vote only once per poll
- Live vote results

**Users:**
- Anyone with a Stellar wallet (Freighter)

---

## Tech Stack

- **Smart Contract:** Rust, Soroban SDK
- **Frontend:** React, Tailwind CSS, Vite
- **Wallet:** Freighter
- **Contract Interaction:** @stellar/soroban-client, @stellar/stellar-sdk

---

## Folder Structure

```
ON-CHAIN VOTING SYSTEM/
├── contract/
│   ├── src/
│   │   └── lib.rs
│   └── Cargo.toml
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConnectWalletButton.jsx
│   │   │   ├── PollCard.jsx
│   │   │   ├── CreatePollForm.jsx
│   │   │   └── VoteOptions.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── CreatePollPage.jsx
│   │   │   └── VotePage.jsx
│   │   ├── utils/
│   │   │   └── soroban.js
│   │   └── App.jsx
│   └── package.json
└── implementation.md
```

---

## Deployment Guide

### 1. Install dependencies

**Contract:**
```
cd contract
cargo build --target wasm32-unknown-unknown --release
```

**Frontend:**
```
cd frontend
npm install
```

### 2. Setup Soroban CLI

Install Soroban CLI: https://soroban.stellar.org/docs/getting-started/installation

### 3. Build contract
```
cargo build --target wasm32-unknown-unknown --release
```

### 4. Deploy contract
```
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/on_chain_voting_system.wasm --network testnet
```
- Save the contract ID output. Add it to `CONTRACT_ID` in `frontend/src/utils/soroban.js`.

### 5. Setup frontend
- In `frontend/src/utils/soroban.js`, set your deployed contract ID in `CONTRACT_ID`.

### 6. Connect wallet
- Open the app, click "Connect Wallet" (Freighter required)

### 7. Run project
```
cd frontend
npm run dev
```

---

## DX Rules
- Keep code simple
- Avoid complex patterns
- Add comments everywhere
- Ensure copy paste works
- No missing imports
- No pseudo code
