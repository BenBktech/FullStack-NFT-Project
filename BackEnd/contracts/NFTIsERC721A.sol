// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

error NFTIsERC721A_NotOwner();
error NFTIsERC721A_OnlyIfYouMint();
error NFTIsERC721A_SupplyExceeded();
error NFTIsERC721A_NftsWalletExceeded();
error NFTIsERC721A_NotEnoughFunds();
error NFTIsERC721A_QueryForNonExistentToken();

contract NFTIsERC721A is ERC721A {
    using Strings for uint;

    uint256 private constant PRICE = 0.01 ether;
    uint256 private constant NUMBER_OF_NFTS = 5;
    address private immutable i_owner;
    string private baseURI;

    mapping(address => uint) public amountNFTsPerWallet;
    uint private constant NUMBER_OF_NFTS_PER_WALLET = 3;

    modifier onlyOwner() {
        if(msg.sender != i_owner) {
            revert NFTIsERC721A_NotOwner();
        }
        _;
    }

    constructor(string memory _baseURI) ERC721A("Ben BK", "BBK") {
       i_owner = msg.sender;
       baseURI = _baseURI;
    }

    function publicMint(uint256 quantity) external payable {
        uint price = getPrice();
        if(totalSupply() + quantity > NUMBER_OF_NFTS) {
            revert NFTIsERC721A_SupplyExceeded();
        }
        if(amountNFTsPerWallet[msg.sender] + quantity > NUMBER_OF_NFTS_PER_WALLET) {
            revert NFTIsERC721A_NftsWalletExceeded();
        }
        if(msg.value < price * quantity) {
            revert NFTIsERC721A_NotEnoughFunds();
        }
        amountNFTsPerWallet[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }

    function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
        if(!_exists(_tokenId)) {
            revert NFTIsERC721A_QueryForNonExistentToken();
        }

        return string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"));
    }

    function getPrice() public pure returns(uint) {
        return PRICE;
    }

    function getBaseURI() public view returns(string memory) {
        return baseURI;
    }

    function getOwner() public view returns(address) {
        return i_owner;
    }
}