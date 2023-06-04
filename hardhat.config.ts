import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "./tasks";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 50,
      },
      viaIR: true,
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    local: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic:
          "isolate reduce speak matter joy chase advice lazy clean asset pill glare",
      },
      companionNetworks: {
        hardhat: "localhost",
      },
    },
    hardhat: {
      chainId: 1337,
      blockGasLimit: 20000000,
      allowUnlimitedContractSize: false,
      accounts: {
        mnemonic:
          "isolate reduce speak matter joy chase advice lazy clean asset pill glare",
      },
    },
    theta: {
      url: "https://eth-rpc-api.thetatoken.org/rpc",
      accounts: process.env.PRIVATE_KEYS?.split(",") || [],
      chainId: 361,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
};

export default config;
