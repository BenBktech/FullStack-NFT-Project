const { network, ethers } = require("hardhat");
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify");
require("dotenv").config()

module.exports = async function({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const args = [];
    const NFTIsERC721A = await deploy("NFTIsERC721A", {
        from: deployer,
        args: args,
        gasLimit: 4000000,
        log: true,
        waitConfirmations: 6,
    })

    if(developmentChains.includes(network.name)) {
        const NFTIsERC721A = await ethers.getContract(
            "NFTIsERC721A"
        );
        log(`Contract address : ${NFTIsERC721A.address}`)
    }

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying")
        await verify(NFTIsERC721A.address, args);
    }
    log("------------------------------------");
}

module.exports.tags = ["all", "nft"];