const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const contractABI = require("../contracts/AuthenticationServiceProvider.json");
// Fetch Contract ABI

exports.fetchContractABI = catchAsyncErrors(async (req, res, next) => {
  // checking if user has given password and email both

  if (!contractABI) {
    return next(new ErrorHandler("Contract not found", 400));
  }
  return res.status(200).json(contractABI.abi);
});
exports.fetchContractAddress = catchAsyncErrors(async (req, res, next) => {
  // checking if user has given password and email both
  const contractAddress = process.env.contractAddress;
  if (!contractAddress) {
    return next(new ErrorHandler("Contract Address not found", 400));
  }
  return res.status(200).json({
    contractAddress,
  });
});
