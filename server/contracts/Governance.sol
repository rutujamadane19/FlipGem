// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./FlipGem.sol";  // Import the FlipGem contract

contract GovernanceContract is Ownable {
    FlipGem public token; // Reference to the FlipGem contract

    struct Proposal {
        uint256 id;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    Proposal[] public proposals; // List of proposals
    mapping(address => bool) public hasVoted; // Mapping to track if a user has voted

    constructor(address _flipGemAddress) {
        token = FlipGem(_flipGemAddress); // Initialize the FlipGem contract
    }

    /**
     * @dev Create a new proposal.
     * @param description The description of the proposal.
     */
    function createProposal(string memory description) external onlyOwner {
        uint256 proposalId = proposals.length;
        proposals.push(Proposal({
            id: proposalId,
            description: description,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        }));
    }

    /**
     * @dev Vote for or against a proposal.
     * @param proposalId The ID of the proposal to vote for.
     * @param voteFor True to vote for, false to vote against.
     */
    function vote(uint256 proposalId, bool voteFor) external {
        require(proposalId < proposals.length, "Invalid proposal ID");
        require(!hasVoted[msg.sender], "You have already voted");

        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has been executed");

        if (voteFor) {
            proposal.votesFor += 1;
        } else {
            proposal.votesAgainst += 1;
        }

        hasVoted[msg.sender] = true;
    }

    /**
     * @dev Execute a proposal if it has enough votes in favor.
     * @param proposalId The ID of the proposal to execute.
     */
    function executeProposal(uint256 proposalId) external onlyOwner {
        require(proposalId < proposals.length, "Invalid proposal ID");

        Proposal storage proposal = proposals[proposalId];
        require(!proposal.executed, "Proposal has already been executed");

        uint256 totalVotes = proposal.votesFor + proposal.votesAgainst;
        require(totalVotes > 0, "No votes recorded for this proposal");

        // Check if the majority of votes are in favor
        if (proposal.votesFor > proposal.votesAgainst) {
            // Execute the proposal
            // Your execution logic here

            proposal.executed = true;
        }
    }

    /**
     * @dev Get the total number of proposals.
     */
    function getProposalsCount() external view returns (uint256) {
        return proposals.length;
    }

    /**
     * @dev Get details of a specific proposal.
     */
    function getProposalDetails(uint256 proposalId) external view returns (
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        bool executed
    ) {
        require(proposalId < proposals.length, "Invalid proposal ID");

        Proposal memory proposal = proposals[proposalId];
        return (
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed
        );
    }
}