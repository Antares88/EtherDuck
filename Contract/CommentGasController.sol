pragma solidity ^0.5.1;

import "./NetworkChecker.sol";
import "./CommentControllerInterface.sol";

contract CommentGasController is CommentControllerInterface {
	
	struct Comment {
		address writer;
		string target;
		string content;
		uint writeTime;
		uint lastUpdateTime;
	}
	
	Comment[] public comments;
	
	mapping(address => uint[]) private writerToCommentIds;
	mapping(string => uint[]) private targetToCommentIds;
	
	function write(string calldata target, string calldata content) external returns (uint) {
		
		uint writeTime = now;
		
		uint commentId = comments.push(Comment({
			writer : msg.sender,
			target : target,
			content : content,
			writeTime : writeTime,
			lastUpdateTime : writeTime
		})).sub(1);
		
		writerToCommentIds[msg.sender].push(commentId);
		targetToCommentIds[target].push(commentId);
		
		emit Write(msg.sender, target, content, writeTime);
		
		return commentId;
	}
	
	function read(uint commentId) external view returns (address writer, string memory target, string memory content, uint writeTime, uint lastUpdateTime) {
		Comment memory comment = comments[commentId];
		return (comment.writer, comment.target, comment.content, comment.writeTime, comment.lastUpdateTime);
	}
	
	function update(uint commentId, string calldata content) external {
		
		Comment storage comment = comments[commentId];
		
		require(comment.writer == msg.sender);
		
		uint updateTime = now;
		
		comment.content = content;
		comment.lastUpdateTime = updateTime;
		
		emit Update(commentId, msg.sender, content, updateTime);
	}
	
	function remove(uint commentId) external {
		
		require(comments[commentId].writer == msg.sender);
		
		delete comments[commentId];
		
		emit Remove(commentId);
	}
	
	function getCommentCount() external view returns (uint) {
		return comments.length;
	}
	
	function getCommentIdsByWriter(address writer) external view returns (uint[] memory) {
		return writerToCommentIds[writer];
	}
	
	function getCommentIdsByTarget(string calldata target) external view returns (uint[] memory) {
		return targetToCommentIds[target];
	}
}