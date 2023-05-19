// Web3 instance

const Web3 = require("web3");
// Web3 Provider Instance
const web3 = new Web3("http://127.0.0.1:7545"); // replace with your Ganache instance URL
// Set the default account for the provider instance to your own Ethereum account
const account = web3.eth.accounts.privateKeyToAccount(process.env.privateKey);
web3.eth.defaultAccount = account.address;
module.exports={Web3,web3,account};