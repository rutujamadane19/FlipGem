// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// FlipGem is an ERC20 token contract named "FlipGem" with symbol "FGM"
contract FlipGem is ERC20 {
    // Constructor that initializes the initial supply of tokens and mints them to the contract deployer
    constructor(uint256 initialSupply) ERC20("FlipGem", "FGM") {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Overrides the transferFrom function to add custom logic if needed.
     * @param sender The address from which tokens are transferred.
     * @param recipient The address to which tokens are transferred.
     * @param amount The amount of tokens to be transferred.
     * @return A boolean indicating the success of the transfer.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        // Additional checks or conditions can be added here if needed
        _transfer(sender, recipient, amount);
        return true;
    }
}