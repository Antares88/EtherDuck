pragma solidity ^0.5.1;

import "./NetworkChecker.sol";
import "./LikeControllerInterface.sol";

contract LikeGasController is NetworkChecker, LikeControllerInterface {
	
	LikeControllerInterface private likeController;
	
	constructor() NetworkChecker() public {
		if (network == Network.Mainnet) {
			likeController = LikeControllerInterface(0x0F442003E883664Bbb08e020276E715C2C59d820);
		} else if (network == Network.Kovan) {
			likeController = LikeControllerInterface(0xE7b69d8a931e408EADb714f41a7Fd19E7292345f);
		} else if (network == Network.Ropsten) {
			likeController = LikeControllerInterface(0xB5EA88F7EF23A21030C89899Ef48462BEA364535);
		} else if (network == Network.Rinkeby) {
			likeController = LikeControllerInterface(0xA08365F2Abc17CF979dF04B6EDb634DfE609F68f);
		} else {
			revert();
		}
	}
	
	struct GasInfo {
		address writer;
		string behavior;
		uint gasUsed;
	}
	
	GasInfo[] public gasInfos;
	
	function getGasInfoCount() external view returns (uint) {
		return gasInfos.length;
	}
	
	function like(string calldata target) external {
		
		uint startGas = gasleft();
		
		likeController.like(target);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'like',
			gasUsed : startGas - gasleft()
		}));
		
		emit Like(msg.sender, target);
	}
	
	function dislike(string calldata target) external {
		
		uint startGas = gasleft();
		
		likeController.dislike(target);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'dislike',
			gasUsed : startGas - gasleft()
		}));
		
		emit Dislike(msg.sender, target);
	}
	
	function checkTargetVoted(string calldata target) external view returns (bool) {
		return likeController.checkTargetVoted(target);
	}
	
	function getLikeCountByTarget(string calldata target) external view returns (uint) {
		return likeController.getLikeCountByTarget(target);
	}
	
	function getDislikeCountByTarget(string calldata target) external view returns (uint) {
		return likeController.getDislikeCountByTarget(target);
	}
}