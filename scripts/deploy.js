const hre = require("hardhat");

async function main() {

  // Deploy the contract
  const HelloHedera = await hre.ethers.getContractFactory("HelloHedera");
  const helloHedera = await HelloHedera.deploy();

  const contractAddress = (await helloHedera.deployTransaction.wait()).contractAddress;

  console.log("HelloWorld contract deployed to:", contractAddress);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
