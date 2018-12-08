pragma solidity ^0.5.1;

import "./ArticleControllerInterface.sol";

contract ArticleController is ArticleControllerInterface {
	
	struct Article {
		address writer;
		string category;
		string title;
		string content;
		uint writeTime;
		uint lastUpdateTime;
	}
	
	Article[] public articles;
	
	mapping(address => uint[]) private writerToArticleIds;
	mapping(string => uint[]) private categoryToArticleIds;
	
	function write(string calldata category, string calldata title, string calldata content) external returns (uint) {
		
		uint writeTime = now;
		
		uint articleId = articles.push(Article({
			writer : msg.sender,
			category : category,
			title : title,
			content : content,
			writeTime : writeTime,
			lastUpdateTime : writeTime
		})).sub(1);
		
		writerToArticleIds[msg.sender].push(articleId);
		categoryToArticleIds[category].push(articleId);
		
		emit Write(msg.sender, category, title, content, writeTime);
		
		return articleId;
	}
	
	function read(uint articleId) external view returns (address writer, string memory category, string memory title, string memory content, uint writeTime, uint lastUpdateTime) {
		Article memory article = articles[articleId];
		return (article.writer, article.category, article.title, article.content, article.writeTime, article.lastUpdateTime);
	}
	
	function update(uint articleId, string calldata category, string calldata title, string calldata content) external {
		
		Article storage article = articles[articleId];
		
		require(article.writer == msg.sender);
		
		uint updateTime = now;
		
		article.category = category;
		article.title = title;
		article.content = content;
		article.lastUpdateTime = updateTime;
		
		emit Update(articleId, msg.sender, category, title, content, updateTime);
	}
	
	function remove(uint articleId) external {
		
		require(articles[articleId].writer == msg.sender);
		
		delete articles[articleId];
		
		emit Remove(articleId);
	}
	
	function getArticleCount() external view returns (uint) {
		return articles.length;
	}
	
	function getArticleIdsByWriter(address writer) external view returns (uint[] memory) {
		return writerToArticleIds[writer];
	}
	
	function getArticleIdsByCategory(string calldata category) external view returns (uint[] memory) {
		return categoryToArticleIds[category];
	}
}