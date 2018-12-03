pragma solidity ^0.4.25;

import "./RMAArticleControllerInterface.sol";

contract RMAArticleController is RMAArticleControllerInterface {
	
	struct Article {
		address writer;
		string category;
		string title;
		string content;
	}
	
	Article[] public articles;
	
	mapping(uint => address) public articleIdToWriter;
	mapping(address => uint[]) public writerToArticleIds;
	mapping(bytes32 => uint[]) public categoryHashToArticleIds;
	
	function write(string category, string title, string content) external {
		
		uint articleId = articles.push(Article({
			writer : msg.sender,
			category : category,
			title : title,
			content : content
		})).sub(1);
		
		articleIdToWriter[articleId] = msg.sender;
		writerToArticleIds[msg.sender].push(articleId);
		categoryHashToArticleIds[keccak256(abi.encodePacked(category))].push(articleId);
		
		emit Write(msg.sender, category, title, content);
	}
	
	function read(uint articleId) external view returns (address writer, string category, string title, string content) {
		Article memory article = articles[articleId];
		return (article.writer, article.category, article.title, article.content);
	}
	
	function getWriterByArticleId(uint articleId) external view returns (address) {
		return articleIdToWriter[articleId];
	}
	
	function getArticleIdsByWriter(address writer) external view returns (uint[]) {
		return writerToArticleIds[writer];
	}
	
	function getArticleIdsByCategory(string category) external view returns (uint[]) {
		return categoryHashToArticleIds[keccak256(abi.encodePacked(category))];
	}
}