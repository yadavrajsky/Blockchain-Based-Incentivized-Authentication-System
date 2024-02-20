const Web3 = require("web3");
// console.log('Step 1: Loading dotenv');
const dotenv = require('dotenv').config();
// console.log('Step 2: dotenv result', dotenv);

// Check if the environment variables are correctly loaded
// console.log('Step 3: Environment variables', process.env);
// const { options } = require('../routes/userRoute');
const web3 = new Web3(process.env.RPC_URL); // replace with your Ganache instance URL
const contractABIInfo = require("../blockchain/abi/contracts/AuthenticationServiceProvider.json");
const contractABI = contractABIInfo.abi;

// Options

//   module.exports=options;

// Set the default account for the provider instance to your own Ethereum account

const privateKey = process.env.company_privateKey;
// console.log("🚀 ~ privateKey:", privateKey)
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
const options = {
  from: account.address, // specify the custom sender address as the `from` option
  gas: 200000, // specify the gas limit for the transaction
};

// replace with your contract ABI
const contractAddress = process.env.contractAddress; // replace with your contract address on the Ganache network

const contract = new web3.eth.Contract(contractABI, contractAddress);

const configuration = async () => {
  // register company name
  await contract.methods
    .registerCompany(process.env.company_name)
    .send(options)
    .then((json) => {
      console.log(json);
    });
  // deposit amount
  const depositAmount = web3.utils.toWei("1", "ether");
  await contract.methods
    .addDeposit()
    .send({ from: account.address, value: depositAmount })
    .on("transactionHash", (hash) => {
      console.log(`Transaction hash: ${hash}`);
    })
    .on("receipt", (receipt) => {
      console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
    })
    .on("error", (error) => {
      console.error(`Error depositing ETH: ${error}`);
    });
};

// // get Balance
// contract.methods.getCompanyDeposit().call({ from: account.address }, (error, result) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log(result);
//     }
// });
// // send(options).then(console.log)
// console.log(data);

// module.exports = contract;
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
const consecutiveLogins = async (num_of_days) => {
  const userWalletAddress = process.env.userWalletAddress;
  for (let index = 0; index < num_of_days; index++) {
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
//   resetTime()
configuration()

// consecutiveLogins(6);
//   increaseTime(86400)
