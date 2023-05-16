// Web3 instance

const Web3 = require("web3");
// Web3 Provider Instance
const web3 = new Web3("http://127.0.0.1:7545"); // replace with your Ganache instance URL
// Set the default account for the provider instance to your own Ethereum account
const privateKey =
  "0x0e01003fdc7f6b95438fe63ec94d96f30944031e45ffd2e0a67d89aaa1a64322";
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
module.exports={Web3,web3,account};