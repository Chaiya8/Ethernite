const fs = require('fs');
const { ethers } = require('hardhat');
async function main() {
  const [deployer, user1] = await ethers.getSigners();
  const EtherniteFactory = await ethers.getContractFactory("PostDonation");
  const ethernite = await EtherniteFactory.deploy();
  const contractsDir = __dirname + "/../src/contractsData";
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + `/ethernite-address.json`,
    JSON.stringify({ address: ethernite.address }, undefined, 2)
  );

  const contractArtifact = artifacts.readArtifactSync("PostDonation");

  fs.writeFileSync(
    contractsDir + `/ethernite.json`,
    JSON.stringify(contractArtifact, null, 2)
  );
  console.log("Ethernite deployed to:", ethernite.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });