const hre = require("hardhat");
require('dotenv').config();

async function main() {

    const contractAddr = process.env.CONTRACT_ADDRESS;

    // Load the Contract
    const HelloHedera  = await hre.ethers.getContractFactory("HelloHedera");
    const helloHedara  = HelloHedera.attach(contractAddr);

    const setMessage   = await helloHedara.setMessage("Hi, Hedera Hashgraph!");

    console.log("Contract calls : ", setMessage);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});