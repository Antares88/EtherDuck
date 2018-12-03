pragma solidity ^0.4.25;

import "./RMACommentControllerInterface.sol";

contract RMACommentController is RMACommentControllerInterface {
	
	struct Comment {
		address writer;
		string target;
		string content;
	}
	
	Comment[] public comments;
	
	mapping(address => uint[]) public writerToCommentIds;
	mapping(bytes32 => uint[]) public targetHashToCommentIds;
	
	function write(string target, string content) external {
		
		uint commentId = comments.push(Comment({
			writer : msg.sender,
			target : target,
			content : content
		})).sub(1);
		
		writerToCommentIds[msg.sender].push(commentId);
		targetHashToCommentIds[keccak256(abi.encodePacked(target))].push(commentId);
		
		emit Write(msg.sender, target, content);
	}
	
	function read(uint commentId) external view returns (address writer, string target, string content) {
		Comment memory comment = comments[commentId];
		return (comment.writer, comment.target, comment.content);
	}
	
	function update(uint commentId, string content) external {
		
		Comment storage comment = comments[commentId];
		
		require(comment.writer == msg.sender);
		
		comment.content = content;
		
		emit Update(commentId, msg.sender, content);
	}
	
	function remove(uint commentId) external {
		
		require(comments[commentId].writer == msg.sender);
		
		delete comments[commentId];
		
		emit Remove(commentId);
	}
	
	function getCommentIdsByWriter(address writer) external view returns (uint[]) {
		return writerToCommentIds[writer];
	}
	
	function getCommentIdsByTarget(string target) external view returns (uint[]) {
		return targetHashToCommentIds[keccak256(abi.encodePacked(target))];
	}
}