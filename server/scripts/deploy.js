const { ethers, upgrades} = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const FlipGem = await ethers.getContractFactory("FlipGem");
  const flipGem = await FlipGem.deploy(1000); // Initial supply of 1000 tokens
  await flipGem.deployed();

  const RewardRules = await ethers.getContractFactory("RewardRules");
  const rewardRules = await RewardRules.deploy(flipGem.address);
  await rewardRules.deployed();

  console.log("FlipGem deployed to:", flipGem.address);
  console.log("Reward Rules deployed to:", rewardRules.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
