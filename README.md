<<<<<<< HEAD
# On-Chain Voting System

A fully decentralized voting dApp built on Stellar Soroban. All polls and votes are stored on-chain for transparency and tamper-proof governance. No backend server is required.

---

## Features
- Create polls with a question and multiple options
- Each wallet can vote only once per poll
- Live vote results
- Freighter wallet integration (Chrome extension)

---

## Tech Stack
- **Smart Contract:** Rust, Soroban SDK
- **Frontend:** React, Tailwind CSS, Vite
- **Wallet:** Freighter
- **Contract Interaction:** @stellar/soroban-client, @stellar/stellar-sdk

---

## File Structure

```
ON-CHAIN VOTING SYSTEM/
├── contract/
│   ├── src/
│   │   └── lib.rs           # Soroban smart contract (Rust)
│   └── Cargo.toml           # Rust package config
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
│   │   │   └── soroban.js   # Contract & wallet interaction logic
│   │   └── App.jsx          # Main React app
│   └── package.json         # Frontend dependencies
├── implementation.md        # Setup & deployment guide
└── README.md                # Project overview (this file)
```

---

## Quick Start

### 1. Install Rust & Soroban CLI
- [Install Rust](https://rustup.rs/)
- [Install Soroban CLI](https://soroban.stellar.org/docs/getting-started/installation)

### 2. Build the Contract
```sh
cd contract
cargo build --target wasm32-unknown-unknown --release
```

### 3. Deploy the Contract
```sh
soroban contract deploy --wasm target/wasm32-unknown-unknown/release/on_chain_voting_system.wasm --network testnet
```
- Save the contract ID and add it to `frontend/src/utils/soroban.js` as `CONTRACT_ID`.

### 4. Setup Frontend
```sh
cd frontend
npm install
```
- Edit `frontend/src/utils/soroban.js` and set your deployed contract ID.

### 5. Run Frontend
```sh
npm run dev
```
- Open the app in your browser. Click "Connect Wallet" to connect Freighter.

---

## Usage
- **Create Poll:** Go to "Create Poll" and submit a question with options.
- **Vote:** Click a poll, select an option, and vote. Each wallet can vote only once per poll.
- **Results:** See live results on the poll page.

---

## Notes
- Make sure the Freighter wallet extension is installed and set to Testnet.
- All votes and polls are stored on-chain for full transparency.
- No backend server is used; all logic is on-chain and in the browser.

---

## License
MIT
=======
# on_chain_voting_system
>>>>>>> a563b705793221bf17e6434c2088d060255b15ee
