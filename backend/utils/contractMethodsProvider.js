const { web3, Web3, account } = require("./web3Provider")
// Contract ABI
const contractABIInfo = require("../blockchain/abi/contracts/AuthenticationServiceProvider.json");
const contractABI = contractABIInfo.abi;
const ErrorHandler = require("./errorHandler");
// contract Address
const contractAddress =process.env.contractAddress;
// contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);
// register Company
const registerCompany = (companyName) => {
  contract.methods.registerCompany(companyName).call(
    {
      from: account.address,
      gas: 200000,
    },
    (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    }
  );
};
// get Balance
const getBalance = () => {
  contract.methods
    .getCompanyDeposit()
    .call({ from: account.address }, (error, result) => {
      if (error) {
        console.error(error);
      } else {
        console.log(result);
      }
    });
};
// deposit Ether
const depositAsset = (assetAmount) => {
  const depositAmount = web3.utils.toWei(assetAmount, "ether");
  contract.methods
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
// registeruser
const registeruser = async (userWalletAddress, userPasswordHash) => {
  try {
    const pass32bytes = Web3.utils.padRight(
      web3.utils.utf8ToHex(userPasswordHash),
      64
    );
    const register = await contract.methods
      .registerUser(userWalletAddress, pass32bytes)
    const data = await register.send({ from: account.address, gas: 3000000 });
    return {
      status: true,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      status: false,
      data: error,
    };
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
    // console.log("🚀 ~ file: contractMethodsProvider.js:93 ~ doesLoginExist ~ response:", response);
    // send({
    //   from:account.address
    // })
    return response;

  } catch (error) {
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


// login user
const loginUser = async (userWalletAddress, userPasswordHash) => {
  try {
    const pass32bytes = Web3.utils.padRight(
      web3.utils.utf8ToHex(userPasswordHash),
      64
    );

    const data = await contract.methods
      .loginUser(userWalletAddress, pass32bytes)
      .send({ from: account.address, gas: 3000000 });
    console.log(data);
    return {
      status: true,
      data: data,

    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};

//update login detail 
const updateLoggedInStatus = async (userWalletAddress) => {
  try {
    const response = await contract.methods.updateLoggedInStatus(userWalletAddress).send({ from: account.address })
    console.log("🚀 ~ file: contractMethodsProvider.js:150 ~ updateLoggedInStatus ~ response:", response);
    return {
      status: true,
      data: response,

    };
  } catch (error) {
    console.log("🚀 ~ file: contractMethodsProvider.js:157 ~ updateLoggedInStatus ~ error:", error);
    
    return {
      status: false,
      error: error,
    };
  }
}

//logout
const logoutUser = async (walletAddress) => {
  try {
    const response = await contract.methods
      .logoutUser(walletAddress)
      .send({ from: account.address });
    return {
      status: true,
      data: response,
    };
  } catch (error) {
    return {
      status: false,
      error: error,
    };
  }
};

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
  registerCompany,
  getBalance,
  depositAsset,
  registeruser,
  logoutUser,
  getIsLoggedInStatus,
  getLastLoginTime,
  loginUser,
  doesLoginExist,
  getTotalLoggedInDays,
  updateLoggedInStatus
};
