const { deployments, ethers, getNamedAccounts } = require("hardhat");
const { assert, expect } = require("chai");
import { NFTIsERC721A } from "../typechain-types";

describe("NFTIsERC721A", async function() {
    let nft: NFTIsERC721A 
    let deployer: string
    let accounts: any

    before(async function() {
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

    it("should get the baseURI and the baseURI should be equal to ipfs://CID/", async function() {
        let baseURI = await nft.getBaseURI()
        assert.equal(baseURI, "ipfs://CID/")
    })

    it("should get the owner of the smart contract", async function() {
        let owner = await nft.getOwner()
        assert.equal(owner, deployer)
    })

    it('the owner should be able to change the baseURI', async function() {
        let newBaseURI = "ipfs://CID2/"
        const transactionResponse = await nft.setBaseURI(newBaseURI)
        await transactionResponse.wait(1);
        let newBaseURIInSC = await nft.getBaseURI()
        assert.equal(newBaseURIInSC, newBaseURI)
    })

    it('only the owner should be able to change the baseURI', async function() {
        let newBaseURI = "ipfs://CID2/"
        accounts = await ethers.getSigners();
        await expect(nft.connect(accounts[1]).setBaseURI(newBaseURI)).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_NotOwner"
        );
    })

    it('should not be possible to get a tokenURI if the NFT has not been minted', async function() {
        await expect(nft.tokenURI(0)).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_QueryForNonExistentToken"
        )
    })

    it('should not be able to mint too many NFTs', async function() {
        await expect(nft.publicMint(4)).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_NftsWalletExceeded"
        );
    })

    it('should be able to mint 1 NFT', async function() {
        let startingBalanceOfUser = await nft.provider.getBalance(deployer)
        let transaction = await nft.publicMint(1, {value: ethers.utils.parseEther("0.01")});
        let transactionReceipt = await transaction.wait(1)
        const { gasUsed, effectiveGasPrice } = transactionReceipt 
        const gasCost = gasUsed.mul(effectiveGasPrice)
        let endingBalanceOfUser = await nft.provider.getBalance(deployer);
        let gasCostAndMintingCostAndEndingBalanceOfUser = endingBalanceOfUser.add(gasCost).add(ethers.utils.parseEther('0.01'));

        let balanceOfDeployer = await nft.balanceOf(deployer)
        assert.equal(balanceOfDeployer.toString(), "1");

        assert.equal(startingBalanceOfUser.toString(), gasCostAndMintingCostAndEndingBalanceOfUser.toString())
    })

    it("the totalSupply should be 1", async function() {
        let totalSupply = await nft.totalSupply()
        assert.equal(totalSupply.toString(), "1");
    })

    it('should be able to mint 1 NFT', async function() {
        let startingBalanceOfUser = await nft.provider.getBalance(deployer)
        let transaction = await nft.publicMint(1, {value: ethers.utils.parseEther("0.01")});
        let transactionReceipt = await transaction.wait(1)
        const { gasUsed, effectiveGasPrice } = transactionReceipt 
        const gasCost = gasUsed.mul(effectiveGasPrice)
        let endingBalanceOfUser = await nft.provider.getBalance(deployer);
        let gasCostAndMintingCostAndEndingBalanceOfUser = endingBalanceOfUser.add(gasCost).add(ethers.utils.parseEther('0.01'));

        let balanceOfDeployer = await nft.balanceOf(deployer)
        assert.equal(balanceOfDeployer.toString(), "2");

        assert.equal(startingBalanceOfUser.toString(), gasCostAndMintingCostAndEndingBalanceOfUser.toString())
    })

    it("the totalSupply should be 2", async function() {
        let totalSupply = await nft.totalSupply()
        assert.equal(totalSupply.toString(), "2");
    })

    it('should be able to mint 1 NFT', async function() {
        let startingBalanceOfUser = await nft.provider.getBalance(deployer)
        let transaction = await nft.publicMint(1, {value: ethers.utils.parseEther("0.01")});
        let transactionReceipt = await transaction.wait(1)
        const { gasUsed, effectiveGasPrice } = transactionReceipt 
        const gasCost = gasUsed.mul(effectiveGasPrice)
        let endingBalanceOfUser = await nft.provider.getBalance(deployer);
        let gasCostAndMintingCostAndEndingBalanceOfUser = endingBalanceOfUser.add(gasCost).add(ethers.utils.parseEther('0.01'));

        let balanceOfDeployer = await nft.balanceOf(deployer)
        assert.equal(balanceOfDeployer.toString(), "3");

        assert.equal(startingBalanceOfUser.toString(), gasCostAndMintingCostAndEndingBalanceOfUser.toString())
    })

    it("the totalSupply should be 3", async function() {
        let totalSupply = await nft.totalSupply()
        assert.equal(totalSupply.toString(), "3");
    })

    it('should not be possible to mint 1 NFT is the user has already minted 3 NFTs', async function() {
        await expect(nft.publicMint(1, {value: ethers.utils.parseEther("0.01")})).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_NftsWalletExceeded"
        )
    })

    it('should get the tokenURI of one NFT that has been minted', async function() {
        let tokenURI = await nft.tokenURI(1);
        let baseURI = await nft.getBaseURI();
        let tokenURIAwaited = baseURI + "1" + ".json";
        assert.equal(tokenURI, tokenURIAwaited)
    })

    it('should not be possible to mint if not enough funds provided', async function() {
        let someEthers = await ethers.utils.parseEther('0.0005');
        await expect(nft.connect(accounts[1]).publicMint(1, {value: someEthers})).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_NotEnoughFunds"
        )
    })

    it('should be possible for 1 user to mint 2 NFTs', async function() {
        let transaction1 = await nft.connect(accounts[2]).publicMint(2, {value: ethers.utils.parseEther('0.02')});
        let balanceOfAccount2 = await nft.balanceOf(accounts[2].address)
        assert.equal(balanceOfAccount2.toString(), "2");
    })

    it("the totalSupply should be 5", async function() {
        let totalSupply = await nft.totalSupply()
        assert.equal(totalSupply.toString(), "5");
    })

    it('should not be possible to mint more NFTs because max supply would be exceeded', async function() {
        await expect(nft.connect(accounts[2]).publicMint(1, {value: ethers.utils.parseEther('0.01')})).to.be.revertedWithCustomError(
            nft,
            "NFTIsERC721A_SupplyExceeded"
        )
    })
})