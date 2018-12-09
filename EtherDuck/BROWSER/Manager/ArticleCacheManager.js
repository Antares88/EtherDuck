EtherDuck.ArticleCacheManager = OBJECT({
	
	init : (inner, self) => {
		
		let writeCacheStore = EtherDuck.SESSION_STORE('writeArticleCacheStore');
		let updateCacheStore = EtherDuck.SESSION_STORE('updateArticleCacheStore');
		let removeCacheStore = EtherDuck.SESSION_STORE('removeArticleCacheStore');
		
		let writeCache = self.writeCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.writer
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			writeCacheStore.save({
				name : JSON.stringify(params),
				value : params
			});
		};
		
		let writeDone = self.writeDone = (params) => {
			//REQUIRED: params
			//REQUIRED: params.writer
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			let key = JSON.stringify(params);
			
			writeCacheStore.remove(key);
			
			return key;
		};
		
		let getWriteCaches = self.getWriteCaches = (category) => {
			//OPTIONAL: category
			
			let writeCaches = writeCacheStore.all();
			let ret = {};
			
			EACH(writeCaches, (writeCache, key) => {
				if (category === undefined || writeCache.category === category) {
					ret[key] = writeCache;
				}
			});
			
			return ret;
		};
		
		let updateCache = self.updateCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.articleId
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			let articleId = params.articleId;
			
			let updateCaches = updateCacheStore.all();
			
			EACH(updateCaches, (updateCache, key) => {
				if (updateCache.articleId === INTEGER(articleId)) {
					updateCacheStore.remove(key);
				}
			});
			
			updateCacheStore.save({
				name : JSON.stringify(params),
				value : params
			});
		};
		
		let updateDone = self.updateDone = (params) => {
			//REQUIRED: params
			//REQUIRED: params.articleId
			//REQUIRED: params.category
			//REQUIRED: params.title
			//REQUIRED: params.content
			
			updateCacheStore.remove(JSON.stringify(params));
		};
		
		let getUpdateCache = self.getUpdateCache = (articleId) => {
			//REQUIRED: articleId
			
			let updateCaches = updateCacheStore.all();
			let ret;
			
			EACH(updateCaches, (updateCache, key) => {
				if (updateCache.articleId === INTEGER(articleId)) {
					ret = updateCache;
					return false;
				}
			});
			
			return ret;
		};
		
		let removeCache = self.removeCache = (articleId) => {
			//REQUIRED: articleId
			
			removeCacheStore.save({
				name : articleId,
				value : true
			});
		};
		
		let removeDone = self.removeDone = (articleId) => {
			//REQUIRED: articleId
			
			removeCacheStore.remove(articleId);
		};
		
		let checkRemoveCache = self.checkRemoveCache = (articleId) => {
			//REQUIRED: articleId
			
			return removeCacheStore.get(articleId);
		};
	}
});