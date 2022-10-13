import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { NFTIsERC721A, NFTIsERC721A__factory } from "../typechain-types";

describe("NftIsERC721A", function() {
    let NFTIsERC721AFactory: NFTIsERC721A__factory
    let NFTIsERC721A: NFTIsERC721A
    let deployer: any

    describe("NFTIsERC721A Tests", async function() {
        it('should deploy the smart contract', async function() {
            NFTIsERC721AFactory = (await ethers.getContractFactory("NFTIsERC721A") as NFTIsERC721A__factory)
            NFTIsERC721A = await NFTIsERC721AFactory.deploy()
            expect(NFTIsERC721A.length).not.to.be.null;
        })

        it("sets the owner of the smart contract correctly", async function() {
            const accounts = await ethers.getSigners()
            const owner = await NFTIsERC721A.getOwner()
            assert.equal(owner, accounts[0].address)
        })
        // deployer = (await getNamedAccounts()).deployer
        // console.log(deployer);
        // await deployments.fixture(["all"])
        // NFTIsERC721A = await ethers.getContract("NFTIsERC721A", deployer);
        // console.log(NFTIsERC721A)
    })

})