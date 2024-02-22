const Web3 = require("web3");
require("dotenv").config();
const web3 = new Web3(process.env.RPC_URL);
const contractABIInfo = require("../contracts/AuthenticationServiceProvider.json");
const contractABI = contractABIInfo.abi;
const privateKey = process.env.company_privateKey;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
const contractAddress = process.env.contractAddress;
const contract = new web3.eth.Contract(contractABI, contractAddress);

const signAndSendTransaction = async (rawTransaction) => {
  try {
    // Sign the transaction
    const signedTransaction = await web3.eth.accounts.signTransaction(
      rawTransaction,
      privateKey
    );

    // Send the raw signed transaction
    const transactionHash = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );

    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.error("Error in signAndSendTransaction:", error);
  }
};

const registerCompany = async () => {
  try {
    const transactionData = contract.methods.registerCompany("Block Auth");
    const gas = await transactionData.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const rawTransaction = {
      from: account.address,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      gasPrice: web3.utils.toHex(gasPrice),
      data: transactionData.encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address),
    };
    signAndSendTransaction(rawTransaction);
  } catch (error) {
    console.error("Error in registerCompany:", error);
  }
};
const depositAmount = async (value, unit) => {
  try {
    const transactionData = contract.methods.addDeposit();
    const transactionHash = await transactionData.send({
      from: account.address,
      value: web3.utils.toWei(value, unit),
    });
    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.error("Error in depositAmount:", error);
  }
};

const increaseTime = async (seconds) => {
  await web3.currentProvider.send(
    {
      jsonrpc: "2.0",
      method: "evm_increaseTime",
      params: [seconds],
      id: new Date().getTime(),
    },
    (error, result) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Time increased by", seconds, "seconds");
      }
    }
  );
};
const resetTime = async () => {
  await web3.currentProvider.send(
    {
      jsonrpc: "2.0",
      method: "evm_revert",
      params: [],
      id: new Date().getTime(),
    },
    (error, result) => {
      if (error) {
        console.error("Error:", error);
      } else {
        console.log("Time reset to current system time");
      }
    }
  );
};
const configuration = async () => {
  // register company name
  await registerCompany();
  // deposit amount
  await depositAmount("1", "ether");
};

const consecutiveLogins = async (num_of_days) => {
  const userWalletAddress = process.env.userWalletAddress;
  for (let index = 1; index <= num_of_days; index++) {
    increaseTime(86400);

    const response = await contract.methods
      .updateLoggedInStatus(userWalletAddress)
      .send({ from: account.address });
    console.log(
      "🚀 ~ file: contractMethodsProvider.js:150 ~ updateLoggedInStatus ~ response:",
      response
    );
  }
};

// configuration();

consecutiveLogins(7);
