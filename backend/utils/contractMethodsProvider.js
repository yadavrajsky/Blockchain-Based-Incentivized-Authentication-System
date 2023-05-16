const {web3,Web3,account}=require("./web3Provider")
// Contract ABI
const contractABI = require("./contractABI");
// contract Address
const contractAddress = "0x81db00b00a04c0764DB6c5E7A4e523648D199091";
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
    const data = await contract.methods
      .registerUser(userWalletAddress, pass32bytes)
      .send({ from: account.address, gas: 3000000 });
    // console.log(
    //   "🚀 ~ file: contractMethodsProvider.js:377 ~ registeruser ~ data:",
    //   data
    // );

    return {
      status: true,
      data: data,
    };
  } catch (error) {
    // console.log(
    //   "🚀 ~ file: contractMethodsProvider.js:389 ~ registeruser ~ error:",
    //   error
    // );
    return {
      status: false,
      data: error,
    };
  }
};

// fetch Login Status
const getIsLoggedInStatus = async (CompanyAddress, userAddress) => {
  try {
    const response = await contract.methods
      .getIsLoggedInStatus(CompanyAddress, userAddress)
      .call();
    // console.log("🚀 ~ file: contractMethodsProvider.js:115 ~ getIsLoggedInStatus ~ response:", response);
    return response;
  } catch (error) {
    // console.log("🚀 ~ file: contractMethodsProvider.js:125 ~ getIsLoggedInStatus ~ error:", error);
    return error;
  }
  // .then(result => console.log(result))
  // .catch(error => console.error(error));
};

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
    return {
      status: true,
      data: data,
    };
  } catch (error) {
    return {
      status: false,
      data: error,
    };
  }
};

//logout
const logoutUser = async (walletAddress) => {
  try {
    const response = await contract.methods
      .logoutUser(walletAddress)
      .send({ from: account.address });
    console.log(
      "🚀 ~ file: contractMethodsProvider.js:139 ~ logoutUser ~ response:",
      response
    );

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
};
