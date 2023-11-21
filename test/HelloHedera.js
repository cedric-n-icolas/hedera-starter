const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("HelloHedera", function () {

  let helloHedera;
  let contractOwner, public;

  before(async function () {

    provider = ethers.provider;
    [contractOwner, public] = await ethers.getSigners();

    // Deploy contract
    const HelloHedera = await ethers.getContractFactory("HelloHedera");
    helloHedera = await HelloHedera.deploy();

  });

  describe("getMessage()", function () {
    it("should return the initial message 'Hello, Hedera!'", async function () {
    
      // Call getMessage() function
      const message = await helloHedera.getMessage();

      // Verify that message is "Hello, Hedera!"
      expect(message).to.equal("Hello, Hedera!");
    });
  });


  describe("setMessage()", function () {

    it("should update the message to 'Hi, Hedera Hashgraph!'", async function () {
      
      // Call setMessage() function
      await helloHedera.connect(contractOwner).setMessage("Hi, Hedera Hashgraph!");
      const message = await helloHedera.getMessage();

      // Verify that message is "Hi, there!"
      expect(message).to.equal("Hi, Hedera Hashgraph!");
    });


    it("should executed only by ContractOwner", async function () {

      // Verify the contract call to be reverted
      await expect(helloHedera.connect(public).setMessage("Hi!")).to.be.revertedWith("Ownable: caller is not the owner");
    });

  });

  describe("pause()", function () {
    it("should pause the smart contract", async function () {
      
      // Call pause() function
      await helloHedera.connect(contractOwner).pause();

      // Verify the contract call to be reverted
      await expect(helloHedera.connect(public).setMessage("Hi!")).to.be.revertedWith("Pausable: paused");
  
    });

    it("should pause the smart contract only by ContractOwner", async function () {
      
      // call unpause function to make sure contract is unpause by ContractOwner
      await helloHedera.connect(contractOwner).unpause();

      // Verify the contract call to be reverted
      await expect(helloHedera.connect(public).pause()).to.be.revertedWith("Ownable: caller is not the owner");
  
    });
  });

  describe("Unpause()", function () {
    it("should unpause the smart contract", async function () {

      // call pause function to make sure contract is pause by ContractOwner
      await helloHedera.connect(contractOwner).pause();
      
      // Call unpause() function
      await helloHedera.connect(contractOwner).unpause();

      // Call setMessage() function
      await helloHedera.connect(contractOwner).setMessage("Hi, There!");
      const message = await helloHedera.getMessage();

      // Verify that message is "Hi, there!"
      expect(message).to.equal("Hi, There!");
  
    });

    it("should unpause the smart contract only by ContractOwner", async function () {
      
      // call pause function to make sure contract is pause by ContractOwner
      await helloHedera.connect(contractOwner).pause();

      // Verify the contract call to be reverted
      await expect(helloHedera.connect(public).unpause()).to.be.revertedWith("Ownable: caller is not the owner");
  
    });

  });

});
