// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

const path = require("path");

async function main() {
  // This is just a convenience check
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  // ethers is available in the global scope
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  // console.log("Account balance:", (await deployer.getBalance()).toString());

  // const TouristContract = await ethers.getContractFactory("TouristConTract");
  // console.log(TouristContract);
  // const tourism = await TouristContract.deploy();
  // await tourism.deployed();

  const tourism = await ethers.deployContract("TouristConTract");

  console.log("Contract address:", await tourism.getAddress());

  // We also save the contract's artifacts and address in the frontend directory
  await saveFrontendFiles(tourism);
}

async function saveFrontendFiles(token) {
  const fs = require("fs");
  const contractsDir = path.join(__dirname, "..", '..', "FE", "src", "contracts");

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    path.join(contractsDir, "contract-address.json"),
    JSON.stringify({ Token: await token.getAddress() }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("TouristConTract");

  fs.writeFileSync(
    path.join(contractsDir, "TouristConTract.json"),
    JSON.stringify(TokenArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });