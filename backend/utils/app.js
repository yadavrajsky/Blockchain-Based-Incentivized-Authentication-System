const Web3 = require('web3');
// const { options } = require('../routes/userRoute');
const web3 = new Web3('http://127.0.0.1:7545'); // replace with your Ganache instance URL
const contractABI = require('./contractABI')
// Options 


//   module.exports=options;


// Set the default account for the provider instance to your own Ethereum account

const privateKey = '0x8992dd9801c464abf4269fe7395c79daddba447a61ff8ba40dc345a764b97cf0';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
const options = {
    from: account.address, // specify the custom sender address as the `from` option
    gas: 200000 // specify the gas limit for the transaction
};


// replace with your contract ABI
const contractAddress = '0xF2891E289C291930E76ee6F99d122b560CB9e5A5'; // replace with your contract address on the Ganache network

const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.methods.registerCompany("Zeal").send(options).then(json=>{
    console.log(json);
})

// // deposit amount 
// const depositAmount = web3.utils.toWei('1', 'ether');
// contract.methods.addDeposit().send({ from: account.address, value: depositAmount })
//   .on('transactionHash', (hash) => {
//     console.log(`Transaction hash: ${hash}`);
//   })
//   .on('receipt', (receipt) => {
//     console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
//   })
//   .on('error', (error) => {
//     console.error(`Error depositing ETH: ${error}`);
//   });

// // get Balance 
// contract.methods.getCompanyDeposit().call({ from: account.address }, (error, result) => {
//     if (error) {
//         console.error(error);
//     } else {
//         console.log(result);
//     }
// });
// send(options).then(console.log)
// console.log(data);


// module.exports = contract;