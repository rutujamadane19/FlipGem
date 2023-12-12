// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FlipGem.sol"; // Import the FlipGem contract

contract UserAccount is Ownable {
    FlipGem public flipGemToken; // Reference to the FlipGem contract

    // Struct to store user information
    struct UserInfo {
        uint256 balance;
        address userAddress;
    }

    // Struct to store transaction information
    struct Transaction {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
    }

    Transaction[] public transactionHistory; // List of transactions
    mapping(address => UserInfo) public users; // Mapping to store user information

    constructor(address _flipGemAddress) {
        flipGemToken = FlipGem(_flipGemAddress); // Initialize the FlipGem contract
    }

    // Get the length of transaction history
    function getTransactionHistoryLength() external view returns (uint256) {
        return transactionHistory.length;
    }

    // Get details of a specific transaction
    function getTransaction(uint256 index) external view returns (address from, address to, uint256 amount, uint256 timestamp) {
        require(index < transactionHistory.length, "Index out of bounds");
        
        Transaction memory transaction = transactionHistory[index];
        return (transaction.from, transaction.to, transaction.amount, transaction.timestamp);
    }
}