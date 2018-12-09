pragma solidity ^0.5.1;

import "./LikeControllerInterface.sol";

contract LikeGasController is LikeControllerInterface {
	
	struct GasInfo {
		address writer;
		string behavior;
		uint gasUsed;
	}
	
	GasInfo[] public gasInfos;
	
	function getGasInfoCount() external view returns (uint) {
		return gasInfos.length;
	}
	
	mapping(address => mapping(string => bool)) private voterToTargetVoted;
	mapping(string => uint) private targetToLikeCount;
	mapping(string => uint) private targetToDislikeCount;
	
	function like(string calldata target) external {
		
		require(voterToTargetVoted[msg.sender][target] != true);
		
		uint startGas = gasleft();
		
		voterToTargetVoted[msg.sender][target] = true;
		
		targetToLikeCount[target] = targetToLikeCount[target].add(1);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'like',
			gasUsed : startGas - gasleft()
		}));
		
		emit Like(msg.sender, target);
	}
	
	function dislike(string calldata target) external {
		
		require(voterToTargetVoted[msg.sender][target] != true);
		
		uint startGas = gasleft();
		
		voterToTargetVoted[msg.sender][target] = true;
		
		targetToDislikeCount[target] = targetToDislikeCount[target].add(1);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'dislike',
			gasUsed : startGas - gasleft()
		}));
		
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