import { ethers } from "hardhat";
import { expect, assert } from "chai";
import { NftIsERC721A, NftIsERC721A__factory } from "../typechain-types";

describe("NftIsERC721A", function() {
    let NFTIsERC721AFactory: NftIsERC721A__factory
    let NftIsERC721A: NftIsERC721A

    beforeEach(async function() {
        NFTIsERC721AFactory = (await ethers.getContractFactory("NFTIsERC721A") as NftIsERC721A__factory)
        NftIsERC721A = await NFTIsERC721AFactory.deploy()
    })

})