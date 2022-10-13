const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
import { NFTIsERC721A } from "../typechain-types";

describe("NFTIsERC721A", async function() {
    let nft: NFTIsERC721A 
    let deployer

    beforeEach(async function() {
        deployer = (await getNamedAccounts()).deployer
        await deployments.fixture(["all"])
        nft = await ethers.getContract("NFTIsERC721A", deployer);
    })

    it('should get the price of 1 NFT and the price should be equal to 0.01 Eth', async function() {
        let priceInContract = await nft.getPrice()
        priceInContract = priceInContract.toString();
        let priceNeeded = ethers.utils.parseEther('0.01')
        priceNeeded = priceNeeded.toString();
        assert.equal(priceInContract, priceNeeded)
    })
})