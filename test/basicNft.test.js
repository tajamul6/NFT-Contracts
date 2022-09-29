const { assert } = require("chai");
const { ethers, getNamedAccounts, deployments } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Basic NFT Unit Tests", function () {
      let basicNft, deployer;

      beforeEach(async () => {
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        await deployments.fixture(["basicnft"]);
        basicNft = await ethers.getContract("BasicNft");
      });

      describe("constructor", function () {
        it("Initializes NFT correctly", async () => {
          const tokenCounter = await basicNft.getTokenCounter();
          assert.equal(tokenCounter.toString(), "0");
          const name = await basicNft.name();
          assert.equal(name, "Okami");
          const symbol = await basicNft.symbol();
          assert.equal(symbol, "Wolf");
        });
      });
      describe("mintNFT", function () {
        it("Successfully mints the NFT", async () => {
          const tx = await basicNft.mintNft();
          await tx.wait(1);
          const tokenCounter = await basicNft.getTokenCounter();
          console.log(`tokenCounter: ${tokenCounter}`);
          assert.equal(tokenCounter.toString(), "1");
        });
      });
      describe("TokenURI", function () {
        it("Successfully retrieves the Token URI", async () => {
          const tokenUri = await basicNft.tokenURI(0);
          assert.equal(tokenUri, await basicNft.TOKEN_URI());
        });
      });
    });
