import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
//require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const REPORT_GAS = process.env.REPORT_GAS;

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    goerli: {
      chainId: 5,
      blockConfirmations: 6,
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY]
    }
  },
  gasReporter: {
    enabled: REPORT_GAS,
    //outputFile: "gas-report.txt",
  },
  solidity: "0.8.17",
  namedAccounts: {
    deployer: {
      default: 0
    }
  },
  mocha: {
    timeout: 200000, //200 seconds max
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY
    }
  }
};

export default config;