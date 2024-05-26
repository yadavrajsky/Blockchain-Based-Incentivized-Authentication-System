const { web3, Web3, account } = require("./web3Provider")
// Contract ABI
const contractABIInfo = require("../contracts/AuthenticationServiceProvider.json");
const contractABI = contractABIInfo.abi;
const ErrorHandler = require("./errorHandler");
// contract Address
const contractAddress =process.env.contractAddress;
// contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
contract.defaultAccount =account.address;
const registerUser = async (userWalletAddress, userPasswordHash) => {
  try {
    const pass32bytes = web3.utils.padRight(
      web3.utils.utf8ToHex(userPasswordHash),
      64
    );
    const register = await contract.methods
      .registerUser(userWalletAddress, pass32bytes);
    const gas = await register.estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const rawTransaction = {
      from: account.address,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      gasPrice: web3.utils.toHex(gasPrice),
      data: register.encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address),
    };
    signAndSendTransaction(rawTransaction);
    return {
      status: true,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      error: error,
    };
  }
};

const loginUser = async (userWalletAddress, userPasswordHash) => {
  try {
    const pass32bytes = web3.utils.padRight(
      web3.utils.utf8ToHex(userPasswordHash),
      64
    );

    const gas = await contract.methods
      .loginUser(userWalletAddress, pass32bytes)
      .estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const rawTransaction = {
      from: account.address,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      gasPrice: web3.utils.toHex(gasPrice),
      data: contract.methods.loginUser(userWalletAddress, pass32bytes).encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address),
    };
    signAndSendTransaction(rawTransaction);
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};

const updateLoggedInStatus = async (userWalletAddress) => {
  try {
    const gas = await contract.methods
      .updateLoggedInStatus(userWalletAddress)
      .estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const rawTransaction = {
      from: account.address,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      gasPrice: web3.utils.toHex(gasPrice),
      data: contract.methods.updateLoggedInStatus(userWalletAddress).encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address),
    };
    signAndSendTransaction(rawTransaction);
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};

const logoutUser = async (walletAddress) => {
  try {
    const gas = await contract.methods
      .logoutUser(walletAddress)
      .estimateGas({ from: account.address });
    const gasPrice = await web3.eth.getGasPrice();
    const rawTransaction = {
      from: account.address,
      to: contractAddress,
      gas: web3.utils.toHex(gas),
      gasPrice: web3.utils.toHex(gasPrice),
      data: contract.methods.logoutUser(walletAddress).encodeABI(),
      nonce: await web3.eth.getTransactionCount(account.address),
    };
    signAndSendTransaction(rawTransaction);
    return {
      status: true,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};

const signAndSendTransaction = async (rawTransaction) => {
  try {
    const signedTransaction = await web3.eth.accounts.signTransaction(
      rawTransaction,
     process.env.company_privateKey
    );
    const transactionHash = await web3.eth.sendSignedTransaction(
      signedTransaction.rawTransaction
    );
    console.log("Transaction Hash:", transactionHash);
  } catch (error) {
    console.error("Error signing and sending transaction:", error);
  }
};

// fetch Login Status
const getIsLoggedInStatus = async (userAddress) => {
  try {
    const response = await contract.methods.getIsLoggedInStatus(account.address, userAddress).call()
    return response;
  } catch (error) {
    return error
  }
};

//Does Login Exists
const doesLoginExist = async (userAddress) => {
  try {
    const response = await contract.methods.doesLoginExist(userAddress).call()
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }

}

const getTotalLoggedInDays = async (userWalletAddress) => {
  try {
    const response = await contract.methods.gettotalLoggedInDays(account.address, userWalletAddress).call()
    return {
      status: true,
      totalLoggedInDays: response
    }
  } catch (error) {
    return {
      status: false,
      error: error
    };
  }

}




// fetch Last Login Time
const getLastLoginTime = async (userAddress) => {
  try {
    const response = await contract.methods.lastLoginTime(userAddress).call();
    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  registerUser,
  logoutUser,
  getIsLoggedInStatus,
  getLastLoginTime,
  loginUser,
  doesLoginExist,
  getTotalLoggedInDays,
  updateLoggedInStatus
};
