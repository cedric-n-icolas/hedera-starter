async function main() {

    const jsonAbi = require("../artifacts/contracts/HelloHedera.sol/HelloHedera.json").abi;
  
    const iface = new ethers.utils.Interface(jsonAbi);
    console.log(iface.format(ethers.utils.FormatTypes.full));
  
  }
  
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });