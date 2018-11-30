pragma solidity ^0.4.25;

import "./Util/SafeMath.sol";

interface RMACommentControllerInterface {
	using SafeMath for uint;
	
    event Write(address indexed writer, string target, string content);
	
	function write(string target, string content) external;
	function read(uint commentId) external view returns (address writer, string target, string content);
	
	function getWriterByCommentId(uint commentId) external view returns (address);
	function getCommentIdsByWriter(address writer) external view returns (uint[]);
	function getCommentIdsByTarget(string target) external view returns (uint[]);
}