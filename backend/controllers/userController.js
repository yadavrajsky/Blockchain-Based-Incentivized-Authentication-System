const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const generateNumber = require("../utils/generateUnique");
const {
  registeruser,
  // getLoginStatus,
  loginUser,
  getIsLoggedInStatus,
  getLastLoginTime,
  logoutUser,
} = require("../utils/contractMethodsProvider");
// const Web3 = require("web3");
// const web3 = new Web3("http://127.0.0.1:7545"); // replace with your Ganache instance URL
// const account = web3.eth.accounts.privateKeyToAccount(process.env.privateKey);
// web3.eth.defaultAccount = account.address;
// const contractAddress = "0x81db00b00a04c0764DB6c5E7A4e523648D199091";
// const contractABI = require("../utils/contractABI");
// const { response } = require("../app");
// const contract = new web3.eth.Contract(contractABI, contractAddress);

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { wallet, password } = req.body;
  const response = await registeruser(wallet, password);
  // console.log("🚀 ~ file: userController.js:29 ~ exports.registerUser=catchAsyncErrors ~ response:", response);
  if (response.status === true) {
    await User.create({
      wallet,
    });
    return res.status(200).json({...response,
    message:"User registered successfully"});
  }
  return res.status(400).json(response);
});
// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { wallet, password } = req.body;
  // checking if user has given password and email both
  if (!wallet || !password) {
    return next(new ErrorHandler("Please Enter Wallet & Password", 400));
  }
  const user = await User.findOne({ wallet });
  if (!user) {
    return next(new ErrorHandler("User not registered", 401));
  }
  const loginStatus = await getIsLoggedInStatus(account.address, wallet);
  if (loginStatus === true) {
    const lastLoginTime = await getLastLoginTime(wallet);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (currentTimeInSeconds - lastLoginTime > 86400) {
      const response = await loginUser(wallet, password);
      if (response.status === true) {
        return res.status(200).json({
          user: wallet,
          isAuthenticated: true,
          data: response.data,
        });
      }
    }
    return res.status(200).json({
      user: wallet,
      isAuthenticated: loginStatus,
    });
  } else {
    const response = await loginUser(wallet, password);
    if (response.status === true) {
      return res.status(200).json({
        user: wallet,
        isAuthenticated: true,
        data: response.data,
      });
    }
  }

  return res.status(400).json(response);
});

//Logout  User
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  const { wallet } = req.body;
  // checking if user
  if (!wallet) {
    return next(new ErrorHandler("Please Enter Wallet", 400));
  }
  const user = await User.findOne({ wallet });
  if (!user) {
    return next(new ErrorHandler("User not registered", 401));
  }
  const loginStatus = await getIsLoggedInStatus(account.address, wallet);

  if (loginStatus === true) {
    const response = await logoutUser(wallet);
    if (response.status === true) {
      return res.status(200).json({
        user: null,
        isAuthenticated: false,
        data: response.data,
      });
    }
  } else {
    return res.status(400).json({ ...response });
  }
  return res.status(400).json({
    error: "Something Went wrong",
  });
});
