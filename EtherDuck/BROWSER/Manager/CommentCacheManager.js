EtherDuck.CommentCacheManager = OBJECT({
	
	init : (inner, self) => {
		
		let writeCacheStore = EtherDuck.SESSION_STORE('writeCommentCacheStore');
		let updateCacheStore = EtherDuck.SESSION_STORE('updateCommentCacheStore');
		let removeCacheStore = EtherDuck.SESSION_STORE('removeCommentCacheStore');
		
		let writeCache = self.writeCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.writer
			//REQUIRED: params.target
			//REQUIRED: params.content
			
			writeCacheStore.save({
				name : JSON.stringify(params),
				value : params
			});
		};
		
		let writeDone = self.writeDone = (params) => {
			//REQUIRED: params
			//REQUIRED: params.writer
			//REQUIRED: params.target
			//REQUIRED: params.content
			
			let key = JSON.stringify(params);
			
			writeCacheStore.remove(key);
			
			return key;
		};
		
		let getWriteCaches = self.getWriteCaches = (target) => {
			//REQUIRED: target
			
			let writeCaches = writeCacheStore.all();
			let ret = {};
			
			EACH(writeCaches, (writeCache, key) => {
				if (writeCache.target === target) {
					ret[key] = writeCache;
				}
			});
			
			return ret;
		};
		
		let updateCache = self.updateCache = (params) => {
			//REQUIRED: params
			//REQUIRED: params.commentId
			//REQUIRED: params.content
			
			let commentId = params.commentId;
			
			let updateCaches = updateCacheStore.all();
			
			EACH(updateCaches, (updateCache, key) => {
				if (updateCache.commentId === INTEGER(commentId)) {
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
			//REQUIRED: params.commentId
			//REQUIRED: params.content
			
			updateCacheStore.remove(JSON.stringify(params));
		};
		
		let getUpdateCache = self.getUpdateCache = (commentId) => {
			//REQUIRED: commentId
			
			let updateCaches = updateCacheStore.all();
			let ret;
			
			EACH(updateCaches, (updateCache, key) => {
				if (updateCache.commentId === INTEGER(commentId)) {
					ret = updateCache;
					return false;
				}
			});
			
			return ret;
		};
		
		let removeCache = self.removeCache = (commentId) => {
			//REQUIRED: commentId
			
			removeCacheStore.save({
				name : commentId,
				value : true
			});
		};
		
		let removeDone = self.removeDone = (commentId) => {
			//REQUIRED: commentId
			
			removeCacheStore.remove(commentId);
		};
		
		let checkRemoveCache = self.checkRemoveCache = (commentId) => {
			//REQUIRED: commentId
			
			return removeCacheStore.get(commentId);
		};
	}
});