const hre = require("hardhat");
require('dotenv').config();
async function main() {
  
  // Deploy the contract
  const HelloHedera = await hre.ethers.getContractFactory("HelloHedera");
  console.log("EVM_ADDRESS= "+process.env.EVM_ADDRESS);
  const helloHedera = await HelloHedera.deploy(process.env.EVM_ADDRESS);

  const contractAddress = (await helloHedera.deploymentTransaction().wait()).contractAddress;

  console.log("HelloWorld contract deployed to:", contractAddress);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
