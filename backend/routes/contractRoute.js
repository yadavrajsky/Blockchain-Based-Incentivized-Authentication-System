const express = require("express");
const { fetchContractABI, fetchContractAddress } = require("../controllers/contractController");
const router = express.Router();
router.route("/contractABI").get(fetchContractABI);
router.route("/contractAddress").get(fetchContractAddress);

module.exports = router;
