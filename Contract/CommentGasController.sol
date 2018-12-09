pragma solidity ^0.5.1;

import "./NetworkChecker.sol";
import "./CommentControllerInterface.sol";

contract CommentGasController is NetworkChecker, CommentControllerInterface {
	
	CommentControllerInterface private commentController;
	
	constructor() NetworkChecker() public {
		if (network == Network.Mainnet) {
			commentController = CommentControllerInterface(0x49f1CaA1E50275CdF84eA4896b584f748153Eee2);
		} else if (network == Network.Kovan) {
			commentController = CommentControllerInterface(0x9940ec104F24c61Acd7aA6573A4217e878A1505E);
		} else if (network == Network.Ropsten) {
			commentController = CommentControllerInterface(0x8d536d404Ee307Dd6FF8599F1Af1ff76AfCde69d);
		} else if (network == Network.Rinkeby) {
			commentController = CommentControllerInterface(0x32A7A93353C2CF233Ad2899A5ca081ac7492e602);
		} else {
			revert();
		}
	}
	
	mapping(uint => address) private commentIdToWriter;
	mapping(address => uint[]) private writerToCommentIds;
	
	struct GasInfo {
		address writer;
		string behavior;
		uint commentId;
		uint gasUsed;
	}
	
	GasInfo[] public gasInfos;
	
	function getGasInfoCount() external view returns (uint) {
		return gasInfos.length;
	}
	
	function write(string calldata target, string calldata content) external returns (uint) {
		
		uint startGas = gasleft();
		
		uint commentId = commentController.write(target, content);
		
		commentIdToWriter[commentId] = msg.sender;
		writerToCommentIds[msg.sender].push(commentId);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'write',
			commentId : commentId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Write(msg.sender, target, content, now);
		
		return commentId;
	}
	
	function read(uint commentId) external view returns (address writer, string memory target, string memory content, uint writeTime, uint lastUpdateTime) {
		
		( , target, content, writeTime, lastUpdateTime) = commentController.read(commentId);
		
		return (commentIdToWriter[commentId], target, content, writeTime, lastUpdateTime);
	}
	
	function update(uint commentId, string calldata content) external {
		
		uint startGas = gasleft();
		
		require(commentIdToWriter[commentId] == msg.sender);
		
		commentController.update(commentId, content);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'update',
			commentId : commentId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Update(commentId, msg.sender, content, now);
	}
	
	function remove(uint commentId) external {
		
		uint startGas = gasleft();
		
		require(commentIdToWriter[commentId] == msg.sender);
		
		commentController.remove(commentId);
		
		delete commentIdToWriter[commentId];
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'remove',
			commentId : commentId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Remove(commentId);
	}
	
	function getCommentCount() external view returns (uint) {
		return commentController.getCommentCount();
	}
	
	function getCommentIdsByWriter(address writer) external view returns (uint[] memory) {
		return writerToCommentIds[writer];
	}
	
	function getCommentIdsByTarget(string calldata target) external view returns (uint[] memory) {
		return commentController.getCommentIdsByTarget(target);
	}
}