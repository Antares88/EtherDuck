pragma solidity ^0.5.1;

import "./Util/SafeMath.sol";

interface CommentControllerInterface {
	using SafeMath for uint;
	
    event Write(address indexed writer, string indexed target, string content, uint writeTime);
    event Update(uint indexed commentId, address indexed writer, string content, uint updateTime);
    event Remove(uint indexed commentId);
	
	function write(string calldata target, string calldata content) external returns (uint commentId);
	function read(uint commentId) external view returns (address writer, string memory target, string memory content, uint writeTime, uint lastUpdateTime);
	function update(uint commentId, string calldata content) external;
	function remove(uint commentId) external;
	
	function getCommentCount() external view returns (uint);
	function getCommentIdsByWriter(address writer) external view returns (uint[] memory);
	function getCommentIdsByTarget(string calldata target) external view returns (uint[] memory);
}