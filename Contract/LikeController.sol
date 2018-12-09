pragma solidity ^0.5.1;

import "./LikeControllerInterface.sol";

contract LikeController is LikeControllerInterface {
	
	mapping(address => mapping(string => bool)) private voterToTargetVoted;
	mapping(string => uint) private targetToLikeCount;
	mapping(string => uint) private targetToDislikeCount;
	
	function like(string calldata target) external {
		
		require(voterToTargetVoted[msg.sender][target] != true);
		
		voterToTargetVoted[msg.sender][target] = true;
		
		targetToLikeCount[target] = targetToLikeCount[target].add(1);
		
		emit Like(msg.sender, target);
	}
	
	function dislike(string calldata target) external {
		
		require(voterToTargetVoted[msg.sender][target] != true);
		
		voterToTargetVoted[msg.sender][target] = true;
		
		targetToDislikeCount[target] = targetToDislikeCount[target].add(1);
		
		emit Dislike(msg.sender, target);
	}
	
	function checkTargetVoted(string calldata target) external view returns (bool) {
		return voterToTargetVoted[msg.sender][target];
	}
	
	function getLikeCountByTarget(string calldata target) external view returns (uint) {
		return targetToLikeCount[target];
	}
	
	function getDislikeCountByTarget(string calldata target) external view returns (uint) {
		return targetToDislikeCount[target];
	}
}