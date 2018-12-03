pragma solidity ^0.4.25;

import "./Util/SafeMath.sol";

interface RMACommentControllerInterface {
	using SafeMath for uint;
	
    event Write(address indexed writer, string indexed target, string content);
    event Update(uint indexed commentId, address indexed writer, string content);
    event Remove(uint indexed commentId);
	
	function write(string target, string content) external;
	function read(uint commentId) external view returns (address writer, string target, string content);
	function update(uint commentId, string content) external;
	function remove(uint commentId) external;
	
	function getCommentIdsByWriter(address writer) external view returns (uint[]);
	function getCommentIdsByTarget(string target) external view returns (uint[]);
}