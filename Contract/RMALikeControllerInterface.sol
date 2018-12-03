pragma solidity ^0.4.25;

import "./Util/SafeMath.sol";

interface RMALikeControllerInterface {
	using SafeMath for uint;
	
    event Like(address indexed voter, string indexed target);
    event Dislike(address indexed voter, string indexed target);
	
	function like(string target) external;
	function dislike(string target) external;
	
	function getLikeCountByTarget(string target) external view returns (uint);
	function getDislikeCountByTarget(string target) external view returns (uint);
}