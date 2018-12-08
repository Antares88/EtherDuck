pragma solidity ^0.5.1;

import "./Util/SafeMath.sol";

interface LikeControllerInterface {
	using SafeMath for uint;
	
    event Like(address indexed voter, string indexed target);
    event Dislike(address indexed voter, string indexed target);
	
	function like(string calldata target) external;
	function dislike(string calldata target) external;
	function checkVoted(string calldata target) external view returns (bool);
	
	function getLikeCountByTarget(string calldata target) external view returns (uint);
	function getDislikeCountByTarget(string calldata target) external view returns (uint);
}