// Web3 instance

const Web3 = require("web3");
// Web3 Provider Instance
const web3 = new Web3(process.env.RPC_URL); // replace with your Ganache instance URL
// Set the default account for the provider instance to your own Ethereum account
const account = web3.eth.accounts.privateKeyToAccount(process.env.company_privateKey);
web3.eth.defaultAccount = account.address;
module.exports={Web3,web3,account};