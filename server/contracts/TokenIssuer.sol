// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./FlipGem.sol";
contract flipGemTokenIssuer is Ownable {
    FlipGem public flipGemToken;
    constructor(address _flipGemTokenAddress) {
        flipGemToken = FlipGem(_flipGemTokenAddress);
    }

    // Function to issue tokens to customers' wallets
    function issueTokens(address customer, uint256 amount) external onlyOwner {
        require(customer != address(0), "Invalid customer address");
        require(amount > 0, "Amount must be greater than zero");

        flipGemToken.transfer(customer, amount);
    }

}