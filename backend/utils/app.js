const Web3 = require('web3');
// const { options } = require('../routes/userRoute');
const web3 = new Web3('http://127.0.0.1:7545'); // replace with your Ganache instance URL
const contractABI = require('./contractABI')
// Options 


//   module.exports=options;


// Set the default account for the provider instance to your own Ethereum account

const privateKey = '0x0e01003fdc7f6b95438fe63ec94d96f30944031e45ffd2e0a67d89aaa1a64322';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
const options = {
    from: account.address, // specify the custom sender address as the `from` option
    gas: 200000 // specify the gas limit for the transaction
};


// replace with your contract ABI
const contractAddress = '0x81db00b00a04c0764DB6c5E7A4e523648D199091'; // replace with your contract address on the Ganache network

const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.registerCompany("Zeal").send(options).then(json=>{
    console.log(json);
})

// deposit amount 
const depositAmount = web3.utils.toWei('1', 'ether');
contract.methods.addDeposit().send({ from: account.address, value: depositAmount })
  .on('transactionHash', (hash) => {
    console.log(`Transaction hash: ${hash}`);
  })
  .on('receipt', (receipt) => {
    console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
  })
  .on('error', (error) => {
    console.error(`Error depositing ETH: ${error}`);
  });

// get Balance 
contract.methods.getCompanyDeposit().call({ from: account.address }, (error, result) => {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
    }
});
// send(options).then(console.log)
// console.log(data);


// module.exports = contract;