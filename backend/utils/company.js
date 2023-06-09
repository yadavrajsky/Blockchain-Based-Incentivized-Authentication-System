const Web3 = require('web3');
// const { options } = require('../routes/userRoute');
const web3 = new Web3('http://127.0.0.1:7545'); // replace with your Ganache instance URL
const contractABI = require('./contractABI')
// Options 


//   module.exports=options;


// Set the default account for the provider instance to your own Ethereum account

const privateKey = '0x22c8d28d1c1a5ef9783e73e048d63b174213ede461627a6d3248207750d43e52';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.defaultAccount = account.address;
const options = {
    from: account.address, // specify the custom sender address as the `from` option
    gas: 200000 // specify the gas limit for the transaction
};


// replace with your contract ABI
const contractAddress = '0x21525dbeea31890ffEe640CBB34FE3420cB7ab13'; // replace with your contract address on the Ganache network

const contract = new web3.eth.Contract(contractABI, contractAddress);


const configuration = async () => {

    // register company name 
    //  await contract.methods.registerCompany("Zeal").send(options).then(json => {
    //         console.log(json);
    //     })
    // deposit amount 
    const depositAmount = web3.utils.toWei('1', 'ether');
    await contract.methods.addDeposit().send({ from: account.address, value: depositAmount })
        .on('transactionHash', (hash) => {
            console.log(`Transaction hash: ${hash}`);
        })
        .on('receipt', (receipt) => {
            console.log(`Transaction receipt: ${JSON.stringify(receipt, null, 2)}`);
        })
        .on('error', (error) => {
            console.error(`Error depositing ETH: ${error}`);
        });
}


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
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [seconds],
        id: new Date().getTime(),
    }, (error, result) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Time increased by', seconds, 'seconds');
        }
    });
};
const resetTime = async () => {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_revert',
        params: [],
        id: new Date().getTime(),
    }, (error, result) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Time reset to current system time');
        }
    });
};
// configuration()
const consecutiveLogins = async () => {
    const userWalletAddress="0x03d05bb307190e4bac777aa8e154d5e30de7e12d"
    for (let index = 0; index < 4; index++) {
        increaseTime(86400)

        const response = await contract.methods.updateLoggedInStatus(userWalletAddress).send({ from: account.address })
        console.log("🚀 ~ file: contractMethodsProvider.js:150 ~ updateLoggedInStatus ~ response:", response);
    }

}
//   resetTime()

// consecutiveLogins()
  increaseTime(86400) 