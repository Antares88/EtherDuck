EtherDuck.ArticleControllerContract = OBJECT({
	
	preset : () => {
		return Contract2Object;
	},
	
	params : () => {
		return {
			
			abi : [{"constant":false,"inputs":[{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"write","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"network","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"writer","type":"address"}],"name":"getArticleIdsByWriter","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gasInfos","outputs":[{"name":"writer","type":"address"},{"name":"behavior","type":"string"},{"name":"articleId","type":"uint256"},{"name":"gasUsed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"category","type":"string"}],"name":"getArticleIdsByCategory","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getArticleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"articleId","type":"uint256"}],"name":"read","outputs":[{"name":"writer","type":"address"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"writeTime","type":"uint256"},{"name":"lastUpdateTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGasInfoCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"writeTime","type":"uint256"}],"name":"Write","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"},{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"updateTime","type":"uint256"}],"name":"Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"}],"name":"Remove","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'0xe76db8bef5f77313bc21047b22c054de41575566' :
			
			// 개발 모드
			// Kovan
			'0x53aa04abc951eeb0c82af5a90b0405179a2f8d05'
		};
	},
	
	init : (inner, self) => {
		
		let writeCacheStore = EtherDuck.STORE('writeArticleCacheStore');
		let updateCacheStore = EtherDuck.STORE('updateArticleCacheStore');
		let removeCacheStore = EtherDuck.STORE('removeArticleCacheStore');
		
		let watchAndRemoveCache = (store, transactionHash) => {
			
			Contract2Object.watchTransaction(transactionHash, {
				error : () => {
					store.remove(transactionHash);
				},
				success : () => {
					store.remove(transactionHash);
				}
			});
		};
		
		// 이미 완료된 트랜잭션 제거
		EACH(writeCacheStore.all(), (writeCache, transactionHash) => {
			watchAndRemoveCache(writeCacheStore, transactionHash);
		});
		EACH(updateCacheStore.all(), (writeCache, transactionHash) => {
			watchAndRemoveCache(updateCacheStore, transactionHash);
		});
		EACH(removeCacheStore.all(), (writeCache, transactionHash) => {
			watchAndRemoveCache(removeCacheStore, transactionHash);
		});
		
		let addWriteCache = self.addWriteCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.transactionHash
			//REQUIRED: params.writer
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			let transactionHash = params.transactionHash;
			let writer = params.writer;
			let category = params.category;
			let title = params.title;
			let content = params.content;
			
			writeCacheStore.save({
				name : transactionHash,
				value : {
					writer : writer,
					category : category,
					title : title,
					content : content
				}
			});
			
			watchAndRemoveCache(writeCacheStore, transactionHash);
		};
		
		let getWriteCaches = self.getWriteCaches = (category) => {
			//OPTIONAL: category
			
			let ret = {};
			EACH(writeCacheStore.all(), (writeCache, transactionHash) => {
				if (category === undefined || writeCache.category === category) {
					ret[transactionHash] = writeCache;
				}
			});
			
			return ret;
		};
		
		let addUpdateCache = self.addUpdateCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.transactionHash
			//REQUIRED: params.articleId
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			let transactionHash = params.transactionHash;
			let articleId = params.articleId;
			let writer = params.writer;
			let category = params.category;
			let title = params.title;
			let content = params.content;
			
			let updateCaches = updateCacheStore.all();
			
			EACH(updateCaches, (updateCache, transactionHash) => {
				if (updateCache.articleId === INTEGER(articleId)) {
					updateCacheStore.remove(transactionHash);
				}
			});
			
			updateCacheStore.save({
				name : transactionHash,
				value : {
					articleId : INTEGER(articleId),
					writer : writer,
					category : category,
					title : title,
					content : content
				}
			});
			
			watchAndRemoveCache(updateCacheStore, transactionHash);
		};
		
		let getUpdateCache = self.getUpdateCache = (articleId) => {
			//REQUIRED: articleId
			
			let ret;
			EACH(updateCacheStore.all(), (updateCache, transactionHash) => {
				if (updateCache.articleId === INTEGER(articleId)) {
					ret = updateCache;
					return false;
				}
			});
			
			return ret;
		};
		
		let addRemoveCache = self.addRemoveCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.transactionHash
			//REQUIRED: params.articleId
			
			let transactionHash = params.transactionHash;
			let articleId = params.articleId;
			
			removeCacheStore.save({
				name : transactionHash,
				value : INTEGER(articleId)
			});
			
			watchAndRemoveCache(removeCacheStore, transactionHash);
		};
		
		let checkRemoveCache = self.checkRemoveCache = (articleId) => {
			//REQUIRED: articleId
			
			let ret = false;
			EACH(removeCacheStore.all(), (removeCache, transactionHash) => {
				if (removeCache === INTEGER(articleId)) {
					ret = true;
					return false;
				}
			});
			
			return ret;
		};
	}
});