pragma solidity ^0.5.1;

import "./ArticleControllerInterface.sol";

contract ArticleController is ArticleControllerInterface {
	
	struct Article {
		address writer;
		string category;
		string title;
		string content;
	}
	
	Article[] public articles;
	
	mapping(address => uint[]) public writerToArticleIds;
	mapping(bytes32 => uint[]) public categoryHashToArticleIds;
	
	function write(string calldata category, string calldata title, string calldata content) external {
		
		uint articleId = articles.push(Article({
			writer : msg.sender,
			category : category,
			title : title,
			content : content
		})).sub(1);
		
		writerToArticleIds[msg.sender].push(articleId);
		categoryHashToArticleIds[keccak256(abi.encodePacked(category))].push(articleId);
		
		emit Write(msg.sender, category, title, content);
	}
	
	function read(uint articleId) external view returns (address writer, string memory category, string memory title, string memory content) {
		Article memory article = articles[articleId];
		return (article.writer, article.category, article.title, article.content);
	}
	
	function update(uint articleId, string calldata category, string calldata title, string calldata content) external {
		
		Article storage article = articles[articleId];
		
		require(article.writer == msg.sender);
		
		article.category = category;
		article.title = title;
		article.content = content;
		
		emit Update(articleId, msg.sender, category, title, content);
	}
	
	function remove(uint articleId) external {
		
		require(articles[articleId].writer == msg.sender);
		
		delete articles[articleId];
		
		emit Remove(articleId);
	}
	
	function getArticleIdsByWriter(address writer) external view returns (uint[] memory) {
		return writerToArticleIds[writer];
	}
	
	function getArticleIdsByCategory(string calldata category) external view returns (uint[] memory) {
		return categoryHashToArticleIds[keccak256(abi.encodePacked(category))];
	}
}