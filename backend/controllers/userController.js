const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const generateNumber = require("../utils/generateUnique");
const {
  registeruser,
  loginUser,
  getIsLoggedInStatus,
  getLastLoginTime,
  logoutUser,
  doesLoginExist,
  getTotalLoggedInDays,
} = require("../utils/contractMethodsProvider");
const userModel = require("../models/userModel");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {

  const { wallet, password } = req.body;
  const walletUser = await userModel.findOne({ wallet: wallet })
  if (walletUser) {
    return res.status(400).json({
      status: false,
      message: "User already registered"
    })

  }

  const response = await registeruser(wallet, password);

  if (response.status === true) {
    await User.create({
      wallet,
    });
    return res.status(200).json({
      ...response,
      message: "User registered successfully"
    });
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

  // User is not in the database of server 
  const user = await User.findOne({ wallet });
  if (!user) {
    return next(new ErrorHandler("User not registered", 401));
  }

  // checking login status in blockchain 
  const doesLoginExists = await doesLoginExist(wallet)
  console.log("🚀 ~ file: userController.js:61 ~ exports.loginUser=catchAsyncErrors ~ doesLoginExists:", doesLoginExists);

  // user loggedIn Info exists into blockchain 
  if (doesLoginExists === true) {

    // checking login status 
    const loggedInStatus = await getIsLoggedInStatus(wallet);
    console.log("🚀 ~ file: userController.js:68 ~ exports.loginUser=catchAsyncErrors ~ loggedInStatus:", loggedInStatus);
    //user is already logged In
    if (loggedInStatus === true) {
      // const user = await userModel.create({ wallet })
      // console.log("🚀 ~ file: userController.js:71 ~ exports.loginUser=catchAsyncErrors ~ user:", user);

      const lastLoginTime = await getLastLoginTime(wallet);
      console.log(lastLoginTime);
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      //if current login is next consecutive day
      if (currentTimeInSeconds - lastLoginTime > 86400) {
        console.log("Here");
        //update consecutive login details
        const response = await loginUser(wallet, password);
        // if successfully updated 
        if (response.status === true) {
          return res.status(200).json({
            user: wallet,
            isAuthenticated: loggedInStatus,
            data: response.data,
            lastLoginTime: lastLoginTime
          });
        }
        // if failed 
        else {
          return res.status(400).json(response);
        }
      }
      //else just return current login detail
      else {
        return res.status(200).json({
          user: wallet,
          isAuthenticated: loggedInStatus,
        });
      }
    }
    else if (loggedInStatus === false) {
      const response = await loginUser(wallet, password);
      if (response.status === true) {
        return res.status(200).json({
          user: wallet,
          isAuthenticated: true,
          data: response.data,
          message: "User Logged In successfully"

        });
      }
      else {
        return res.status(400).json(response);
      }

    }
    else
      return res.status(400).json({
        status: false,
        data: loggedInStatus
      })

  }
  else if (doesLoginExists === false) {

    const response = await loginUser(wallet, password);
    const user = await userModel.create({ wallet })
    if (response.status === true) {
      return res.status(200).json({
        user: wallet,
        isAuthenticated: true,
        data: response.data,
        message: "User Logged In successfully"

      });
    }
    else {
      return res.status(400).json(response);
    }

  }
  return next(new ErrorHandler("Something went wrong", 401));


  //   res.json({loggedInStatus})
  // }
  // else if (doesLoginExists === false) {
  //   const response = await loginUser(wallet, password);
  //   console.log("🚀 ~ file: userController.js:64 ~ exports.loginUser=catchAsyncErrors ~ response:", response);
  //   if (response.status === true) {
  // const user = await userModel.create({ wallet });
  // if (user) {

  //   console.log(user);
  // }
  //     const isLoggedInStatus = await getIsLoggedInStatus(wallet)
  //     return res.status(200).json({
  //       doesLoginExists: doesLoginExists,
  //       user: wallet,
  //       mongouser: user,
  //       isLoggedInStatus: isLoggedInStatus,
  //       isAuthenticated: isLoggedInStatus,
  //       data: response.data,
  //     });
  //   }
  // }
  // console.log("🚀 ~ file: userController.js:56 ~ loginStatus:", loggedInStatus);
  // if (loggedInStatus === true) {
  // }
  // else if (loggedInStatus === false) {

  // }
  // return next(new ErrorHandler("Something went wrong", 401));
  // const lastLoginTime = await getLastLoginTime(wallet);
  // console.log("🚀 ~ file: userController.js:70 ~ exports.loginUser=catchAsyncErrors ~ lastLoginTime:", lastLoginTime);
  // const response = await loginUser(wallet, password);
  // if (response.status === true) {
  // return res.status(200).json({
  //   user: wallet,
  //   isAuthenticated: true,
  //   data: response.data,
  // });
  // const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  // if (currentTimeInSeconds - lastLoginTime > 86400) {
  // const response = await loginUser(wallet, password);
  // if (response.status === true) {
  // return res.status(400).json({
  //   user: wallet,
  //   isAuthenticated: loggedInStatus,
  // data: response.data,
  // lastLoginTime:lastLoginTime
  // });
  // }
  // }
  // return res.status(200).json({
  //   user: wallet,
  //   isAuthenticated: false,

  // }
  // );
  // } 
  // if(false) {
  //   const response = await loginUser(wallet, password);
  //   if (response.status === true) {
  //     return res.status(200).json({
  //       user: wallet,
  //       isAuthenticated: true,
  //       data: response.data,
  //       message:"User Logged In successfully"

  //     });
  //   }
  //   else {
  //     return res.status(400).json(response);
  //   }
  // }

});

// Get Total Logged In days 
exports.gettotalLoggedInDays = catchAsyncErrors(async (req, res, next) => {
  const { wallet } = req.body;
  // checking if user
  if (!wallet) {
    return next(new ErrorHandler("Please Enter Wallet", 400));
  }
  const user = await User.findOne({ wallet });
  if (!user) {
    return next(new ErrorHandler("User not registered", 401));
  }
  const totalLoggedInDays = await getTotalLoggedInDays(wallet);
  if (totalLoggedInDays.status === true) {
    return res.status(200).json(totalLoggedInDays)
  }
  return res.status(400).json({
    status: false,
    data: totalLoggedInDays
  })
})

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
  const loginStatus = await getIsLoggedInStatus(wallet);
  // console.log("🚀 ~ file: userController.js:119 ~ exports.logoutUser=catchAsyncErrors ~ loginStatus:", loginStatus);

  if (loginStatus === true) {
    const response = await logoutUser(wallet);
    console.log(response);
    if (response.status === true) {
      return res.status(200).json({
        user: null,
        isAuthenticated: false,
        data: response.data,
        message: "User logged out successfully"
      });
    }
    else {
      return res.status(400).json(response);
    }
  }
  return res.status(200).json({
    user: null,
    isAuthenticated: loginStatus,
    message: "User seems to be already logged out"
  });
});
