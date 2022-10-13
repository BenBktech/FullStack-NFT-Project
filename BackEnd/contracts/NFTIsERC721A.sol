pragma solidity ^0.8.17;

import "./ERC721A.sol";

contract NFTIsERC721A is ERC721A {
    constructor() ERC721A("Ben BK", "BBK") {}

    function mint(uint256 quantity) external payable {
        // `_mint`'s second argument now takes in a `quantity`, not a `tokenId`.
        _mint(msg.sender, quantity);
    }
}