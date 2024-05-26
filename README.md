<h1 align="center">🌐 Blockchain-Based Authentication and Incentive System</h1>

<p align="center">
  <img src="https://img.shields.io/badge/license-MIT-blue.svg">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
</p>

## 📖 Overview

The Blockchain-Based Authentication and Incentive System is a cutting-edge solution designed to elevate user authentication, security, and engagement for companies. By harnessing the power of blockchain technology, this system bids farewell to conventional authentication methods like email or usernames. Companies registering on the blockchain will deposit an initial asset, acting as an incentive for their active users.

<h2 align="center">📚 Research Paper</h2>

<p align="center">
  <a href="https://ijsrem.com/download/advance-authentication-system-using-block-chain-network/">
    <img src="https://img.shields.io/badge/Research%20Paper-Blockchain%20Authentication-blue">
  </a>
</p>

<p align="center">
  <a href="https://ijsrem.com/download/advance-authentication-system-using-block-chain-network/">
    <img src="https://img.shields.io/badge/Read-Here-orange.svg">
  </a>
</p>


<p align="center">
  <img src="https://github.com/yadavrajsky/Blockchain-Based-Incentivized-Authentication-System/assets/70022991/e0f2fa6e-e5bd-42b2-98e3-551a22706398" alt="System Overview">
  
  <img src="https://github.com/yadavrajsky/Blockchain-Based-Incentivized-Authentication-System/assets/70022991/0dc7c2e1-3887-42f5-aa7b-c73bb931c4b3" alt="Company Page">
  
 <img src="https://github.com/yadavrajsky/Blockchain-Based-Incentivized-Authentication-System/assets/70022991/a91faec8-548d-4d50-aa6a-acff3834206d" alt="System Overview">
 
 <img src="https://github.com/yadavrajsky/Blockchain-Based-Incentivized-Authentication-System/assets/70022991/6720b9ac-4176-4054-8a87-ad4cae18f90c" alt="System Overview">

</p>

## 🎁 Features

### 📚 Blockchain Registration

- Companies register on the blockchain and deposit an initial asset.
- Blockchain ensures transparency, immutability, and trust in the registration process.

### 🔐 Wallet Address and Password Authentication

- User registration relies on a secure combination of wallet address and password, enhancing privacy and security.
- No need for traditional email or username-based authentication.

### ⏱️ Session Management

- Companies conduct user sessions, authenticate users, and track regular sessions.
- User login data is updated daily to monitor user activity.

### 💡 Incentive Mechanism

- Smart contracts come into play, rewarding active users with incentives.
- Users with consecutive active days receive rewards based on predefined criteria.

### 🚨 Trustworthiness Monitoring

- Companies are responsible for regular updates of users' login data.
- Failure to update login data is flagged, and companies may be deemed untrustworthy.

## 🚀 Installation

To get started with the Blockchain-Based Authentication and Incentive System, follow the steps below:

## Prerequisites

- [Node.js](https://nodejs.org/) - Ensure Node.js is installed.
- [Ganache](https://www.trufflesuite.com/ganache) - Required if deploying locally.
- [MongoDB](https://www.mongodb.com/) - MongoDB for database storage.
- [MetaMask](https://metamask.io/) - A crypto wallet and gateway to blockchain apps.

<!-- Rest of the installation instructions -->
## Deploying Smart Contract on Blockchain

1. Open a new terminal.
2. Navigate to the `blockchain` directory.
```bash
  cd blockchain
```

### MetaMask Configuration

- Create 3 MetaMask accounts (Owner of the contract, Company account, User).
- Alternatively, import accounts from Ganache if using it as a local blockchain.
- Ensure that the owner of the contract and company account has some ETH balance to cover gas costs.

### Smart Contracts Setup

1. Open a terminal and go to `contracts` folder into the `blockchain` directory.

```bash
cd blockchain/contracts
```
2. Install dependencies:

```bash
   npm install
```
3. Configure the `.env` file and `hardhat.config.ts` in the `blockchain` directory:

- For Sepolia Testnet, use: 
  `API_URL=https://eth-sepolia.g.alchemy.com/v2/your-api-key`
- For Ganache, use: 
  `API_URL=http://127.0.0.1:7545`
- The private key should belong to the owner of the smart contract.

```env
API_URL=http://127.0.0.1:7545
# Make sure the private key has a prefix of 0x.... (If it doesn't exist, add it)
PRIVATE_KEY=your_private_key
```

### Update Solidity Version in Contracts

To ensure all contracts within the `blockchain/contracts` directory use the Solidity version `0.8.24` and to configure your Hardhat environment to use the same version.

Ensure that each Solidity contract file in the `blockchain/contracts` directory has the following header:

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.24;
// Rest of the code
```
### Hardhat Configuration

In your `hardhat.config.ts` file, set the Solidity version to `0.8.24`. 

```ts
const config: HardhatUserConfig = {
  solidity: "0.8.24", //Similar to Solidity version 
  //Rest of the code
};
```

### Compile the contracts:

```bash
npx hardhat compile
```

After compiling the smart contracts, copy the `AuthenticationServiceProvider.json` file from the `blockchain/contracts/AuthServiceProvide.sol/AuthenticationServiceProvider.json` directory and paste it into the `backend/contracts` directory.

### Deploying Contract

```bash
npx hardhat run deployments/deploy.js --network networkName
```
After executing the previous command, you should see something like this:

```bash
Contract Deployed to Address: 0xc5cCbE0F358643b3DdCC13d2667......50
```
`0xc5cCbE0F358643b3DdCC13d2667......50` is your smart contract address.

## Setting up Backend

1. Open a new terminal.
2. Navigate to the `backend` directory.
```bash
  cd backend
```
3. Install dependencies:

```bash
   npm install
```
4. Configure the `.env` file in the `backend` directory:

```env
  PORT=4000
  DB_URI="mongodb://127.0.0.1:27017/your_db_name"
  company_privateKey=your_company_privateKey
  contractAddress=your_contract_address
  userWalletAddress=your_user_wallet_address_for_testing_consecutive_logins_by_custom_script_if_using_ganache
  #For network based RPC URL eg. sepolia -  RPC_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
  #For Ganache
  RPC_URL="http://127.0.0.1:7545"
```

5. Start the backend server
```bash
   npm run dev
```
## Project Frontend Setup Guide

## Getting Started

Follow these steps to set up the frontend of the project.

### 1. Open a New Terminal

Open a new terminal to execute the commands.

### 2. Navigate to the Frontend Directory

Use the following command to navigate to the `frontend` directory.

```bash
cd frontend
```
### 3. Install Dependencies

Install project dependencies with the following command:

```bash
npm install
```
### 4. Start the Frontend Server

Once the dependencies are installed, start the frontend server using the following command:

```bash
   npm run start
```
This will launch the development server, and you can access the frontend by visiting http://localhost:3000/ in your browser.

## How to Use the Application

### Register Company and Deposit ETH  

Navigate to http://localhost:3000/company to register your company name and deposit ETH. Connect your company's Metamask wallet for the transaction.

### Register and Login as a User

Connect the Metamask wallet of the user's account. Register the user using the wallet address and password, then log in to interact with the web app.

### Consecutive Login Rewards

After seven consecutive days of login, the user will receive automatic rewards. To simulate this with Ganache:

1. Open a new terminal.
2. Navigate to the `backend` directory.
   
```bash
  cd backend
```
1. Update the `userWalletAddress` in the `.env` file with the user's wallet address for whom you want to simulate seven days of consecutive login (Only Ganache).
2. Run the following command:

```bash
   npm run custom
```
Enjoy exploring the application!

## 🤝 Contribution

👏 We welcome contributions, bug reports, and feature requests. Feel free to fork the repository, open issues, and submit pull requests to contribute to the continuous improvement of the Blockchain-Based Authentication and Incentive System.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

## ⚠️ Disclaimer

This project is under active development, and features may change. Use at your own risk.

## 🙌 Acknowledgments

We express gratitude to the open-source community and various contributors for their valuable input and feedback in shaping this project.

*Join us in revolutionizing authentication and engagement in the digital era!* 🚀







