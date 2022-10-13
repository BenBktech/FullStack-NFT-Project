pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";
import "./ERC721A.sol";

error NFTIsERC721A_NotOwner();
error NFTIsERC721A_OnlyIfYouMint();
error NFTIsERC721A_SupplyExceeded();
error NFTIsERC721A_NftsWalletExceeded();
error NFTIsERC721A_NotEnoughFunds();

contract NFTIsERC721A is ERC721A {
    using Strings for uint;

    uint256 private constant S_PRICE = 0.01 ether;
    uint256 private constant S_NUMBER_OF_NFTS = 300;
    uint256 private s_saleStartTime = 4234234;
    address private immutable i_owner;
    string private s_baseURI;

    mapping(address => uint) public s_amountNFTsPerWallet;
    uint private constant S_NUMBER_OF_NFTS_PER_WALLET = 3;

    modifier onlyOwner() {
        if(msg.sender != i_owner) {
            revert NFTIsERC721A_NotOwner();
            _;
        }
    }

    constructor() ERC721A("Ben BK", "BBK") {
       i_owner = msg.sender;
    }

    function mint(uint256 quantity) external payable {
        uint price = getPrice();
        if(totalSupply() + quantity > S_NUMBER_OF_NFTS) {
            revert NFTIsERC721A_SupplyExceeded();
        }
        if(s_amountNFTsPerWallet[msg.sender] + quantity > S_NUMBER_OF_NFTS_PER_WALLET) {
            revert NFTIsERC721A_NftsWalletExceeded();
        }
        if(msg.value < price * quantity) {
            revert NFTIsERC721A_NotEnoughFunds();
        }
        s_amountNFTsPerWallet[msg.sender] += quantity;
        _safeMint(msg.sender, quantity);
    }

    function setSaleStartTime(uint256 saleStartTime) external onlyOwner {
        s_saleStartTime = saleStartTime;
    }

    function setBaseURI(string memory baseURI) external onlyOwner {
        s_baseURI = baseURI;
    }

    function tokenURI(uint _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        return string(abi.encodePacked(s_baseURI, _tokenId.toString(), ".json"));
    }

    function getPrice() public pure returns(uint) {
        return S_PRICE;
    }

    function getSaleStartTime() public view returns(uint) {
        return s_saleStartTime;
    }

    function getBaseURI() public view returns(string memory) {
        return s_baseURI;
    }
}