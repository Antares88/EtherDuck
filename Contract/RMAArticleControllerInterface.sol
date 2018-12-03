pragma solidity ^0.4.25;

import "./Util/SafeMath.sol";

interface RMAArticleControllerInterface {
	using SafeMath for uint;
	
    event Write(address indexed writer, string indexed category, string title, string content);
    event Update(uint indexed articleId, address indexed writer, string indexed category, string title, string content);
    event Remove(uint indexed articleId);
	
	function write(string category, string title, string content) external;
	function read(uint articleId) external view returns (address writer, string category, string title, string content);
	function update(uint articleId, string category, string title, string content) external;
	function remove(uint articleId) external;
	
	function getArticleIdsByWriter(address writer) external view returns (uint[]);
	function getArticleIdsByCategory(string category) external view returns (uint[]);
}