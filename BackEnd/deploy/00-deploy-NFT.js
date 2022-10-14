const { network } = require("hardhat");
const { networkConfig, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async(hre) => {
    const { getNamedAccounts, deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    const args = ["ipfs://CID/"]
    const NFTIsERC721A = await deploy("NFTIsERC721A", {
        from: deployer,
        args: args, //price feed address,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })

    //We don't want to verify on a local network
    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        await verify(NFTIsERC721A.address, args);
    }

    log("----------------------------");
}

module.exports.tags = ["all", "NFTIsERC721A"]