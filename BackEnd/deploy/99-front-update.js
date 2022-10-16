// const { ethers, network } = require("hardhat")
// const FRONT_END_ADDRESSES_FILE = "../../frontend/constants/contractAddress.json"
// const FRONT_END_ABI_FILE = "../../frontend/constants/abi.json";
// const fs = require("fs")

// module.exports = async function() {
//     if(process.env.UPDATE_FRONT_END) {
//         console.log("Updating front end")
//         await updateContractAddresses() 
//         await updateAbi()
//         console.log('UPDATED ABI & SC Address')
//     }
// }

// async function updateAbi() {
//     const NFTIsERC721A = await ethers.getContract("NFTIsERC721A") 
//     fs.writeFileSync(FRONT_END_ABI_FILE, NFTIsERC721A.interface.format(ethers.utils.FormatTypes.json))
// }

// async function updateContractAddresses() {
//     const NFTIsERC721A = await ethers.getContract("NFTIsERC721Afle");
//     const chainId = network.config.chainId.toString();
//     const currentAddresses =  JSON.parse(fs.readFileSync(FRONT_END_ADDRESSES_FILE, "utf8"));
//     if(chainId in currentAddresses) {
//         if(!currentAddresses[chainId].includes(NFTIsERC721A.address)) {
//             currentAddresses[chainId].push(NFTIsERC721A.address)
//         }
//     }
//     {
//         currentAddresses[chainId] = [NFTIsERC721A.address]
//     }
//     fs.writeFileSync(FRONT_END_ADDRESSES_FILE, JSON.stringify(currentAddresses))
// }

// module.exports.tags = ["all", "frontend"]