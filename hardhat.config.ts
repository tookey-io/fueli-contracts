import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
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
    hardhat: {
      chainId: 361,
      blockGasLimit: 20000000,
      allowUnlimitedContractSize: false,
      accounts: {
        mnemonic:
          "isolate reduce speak matter joy chase advice lazy clean asset pill glare",
      },
    },
  },
};

export default config;
