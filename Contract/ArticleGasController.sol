pragma solidity ^0.5.1;

import "./NetworkChecker.sol";
import "./ArticleControllerInterface.sol";

contract ArticleGasController is NetworkChecker, ArticleControllerInterface {
	
	ArticleControllerInterface private articleController;
	
	constructor() NetworkChecker() public {
		if (network == Network.Mainnet) {
			articleController = ArticleControllerInterface(0xc58f0f5F03FD9072f158e88d302aCC7aEeF9150D);
		} else if (network == Network.Kovan) {
			articleController = ArticleControllerInterface(0x4CeeC8C3e3b8118e1a2e0264fd7Cb9cc009E22Af);
		} else if (network == Network.Ropsten) {
			articleController = ArticleControllerInterface(0x8c877364fc3D73d4c0396C097dA8877546FA17AB);
		} else if (network == Network.Rinkeby) {
			articleController = ArticleControllerInterface(0xA9DAF435e8780A0583B79FfE24f93e8159B88142);
		} else {
			revert();
		}
	}
	
	mapping(uint => address) private articleIdToWriter;
	mapping(address => uint[]) private writerToArticleIds;
	
	struct GasInfo {
		address writer;
		string behavior;
		uint articleId;
		uint gasUsed;
	}
	
	GasInfo[] public gasInfos;
	
	function getGasInfoCount() external view returns (uint) {
		return gasInfos.length;
	}
	
	function write(string calldata category, string calldata title, string calldata content) external returns (uint) {
		
		uint startGas = gasleft();
		
		uint articleId = articleController.write(category, title, content);
		
		articleIdToWriter[articleId] = msg.sender;
		writerToArticleIds[msg.sender].push(articleId);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'write',
			articleId : articleId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Write(msg.sender, category, title, content, now);
		
		return articleId;
	}
	
	function read(uint articleId) external view returns (address writer, string memory category, string memory title, string memory content, uint writeTime, uint lastUpdateTime) {
		
		( , category, title, content, writeTime, lastUpdateTime) = articleController.read(articleId);
		
		return (articleIdToWriter[articleId], category, title, content, writeTime, lastUpdateTime);
	}
	
	function update(uint articleId, string calldata category, string calldata title, string calldata content) external {
		
		uint startGas = gasleft();
		
		require(articleIdToWriter[articleId] == msg.sender);
		
		articleController.update(articleId, category, title, content);
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'update',
			articleId : articleId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Update(articleId, msg.sender, category, title, content, now);
	}
	
	function remove(uint articleId) external {
		
		uint startGas = gasleft();
		
		require(articleIdToWriter[articleId] == msg.sender);
		
		articleController.remove(articleId);
		
		delete articleIdToWriter[articleId];
		
		gasInfos.push(GasInfo({
			writer : msg.sender,
			behavior : 'remove',
			articleId : articleId,
			gasUsed : startGas - gasleft()
		}));
		
		emit Remove(articleId);
	}
	
	function getArticleCount() external view returns (uint) {
		return articleController.getArticleCount();
	}
	
	function getArticleIdsByWriter(address writer) external view returns (uint[] memory) {
		return writerToArticleIds[writer];
	}
	
	function getArticleIdsByCategory(string calldata category) external view returns (uint[] memory) {
		return articleController.getArticleIdsByCategory(category);
	}
}