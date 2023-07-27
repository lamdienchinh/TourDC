require("@nomicfoundation/hardhat-toolbox");
const INFURA_API_KEY = "c6b95d3b003e40cda8dcf76f7ba58be8";

// account 1
const SEPOLIA_PRIVATE_KEY = "93856d655b8ecd9ebff0f2c3c5d614834ecf76b66b6fca8ad6fc37381c1989b4";
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "V98E8F6KC1FBKPKHV1GVTVCW8IXC1JUKY3"
  }
};
