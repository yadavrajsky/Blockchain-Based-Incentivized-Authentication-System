// Web3 instance

const {Web3} = require("web3");
const provider = new Web3.providers.HttpProvider(process.env.RPC_URL);

// Web3 Provider Instance
const web3 = new Web3(provider);
// Set the default account for the provider instance to your own Ethereum account
const account = web3.eth.accounts.privateKeyToAccount(process.env.company_privateKey);
web3.eth.defaultAccount = account.address;
module.exports={Web3,web3,account};