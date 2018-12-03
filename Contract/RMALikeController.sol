pragma solidity ^0.4.25;

import "./RMALikeControllerInterface.sol";

contract RMALikeController is RMALikeControllerInterface {
	
	mapping(address => mapping(bytes32 => bool)) public checkTargetVoted;
	mapping(bytes32 => uint) public targetHashToLikeCount;
	mapping(bytes32 => uint) public targetHashToDislikeCount;
	
	function like(string target) external {
		
		bytes32 targetBytes = keccak256(abi.encodePacked(target));
		
		require(checkTargetVoted[msg.sender][targetBytes] != true);
		
		checkTargetVoted[msg.sender][targetBytes] = true;
		
		targetHashToLikeCount[targetBytes].add(1);
		
		emit Like(msg.sender, target);
	}
	
	function dislike(string target) external {
		
		bytes32 targetBytes = keccak256(abi.encodePacked(target));
		
		require(checkTargetVoted[msg.sender][targetBytes] != true);
		
		checkTargetVoted[msg.sender][targetBytes] = true;
		
		targetHashToDislikeCount[targetBytes].add(1);
		
		emit Dislike(msg.sender, target);
	}
	
	function getLikeCountByTarget(string target) external view returns (uint) {
		return targetHashToLikeCount[keccak256(abi.encodePacked(target))];
	}
	
	function getDislikeCountByTarget(string target) external view returns (uint) {
		return targetHashToDislikeCount[keccak256(abi.encodePacked(target))];
	}
}