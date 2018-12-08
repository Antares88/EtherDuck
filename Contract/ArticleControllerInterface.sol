pragma solidity ^0.5.1;

import "./Util/SafeMath.sol";

interface ArticleControllerInterface {
	using SafeMath for uint;
	
    event Write(address indexed writer, string indexed category, string title, string content, uint writeTime);
    event Update(uint indexed articleId, address indexed writer, string indexed category, string title, string content, uint updateTime);
    event Remove(uint indexed articleId);
	
	function write(string calldata category, string calldata title, string calldata content) external returns (uint articleId);
	function read(uint articleId) external view returns (address writer, string memory category, string memory title, string memory content, uint writeTime, uint lastUpdateTime);
	function update(uint articleId, string calldata category, string calldata title, string calldata content) external;
	function remove(uint articleId) external;
	
	function getArticleCount() external view returns (uint);
	function getArticleIdsByWriter(address writer) external view returns (uint[] memory);
	function getArticleIdsByCategory(string calldata category) external view returns (uint[] memory);
}