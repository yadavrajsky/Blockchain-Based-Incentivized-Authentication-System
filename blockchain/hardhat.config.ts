require('dotenv').config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  defaultNetwork: "networkName",
  networks: {
    hardhat: {},
    networkName: {
      url: process.env.API_URL,
      accounts: [`${process.env.PRIVATE_KEY}`]
    },
  }
};

export default config;
