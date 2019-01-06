EtherDuck.NestNodeManager = OBJECT({
	
	init : (inner, self) => {
		
		let nestNode;
		let waitingHandlers = [];
		
		// 둥지 접속
		DSide.Connect({
			port : 8231,
			ips : [
				'175.207.29.156',
				'110.11.179.222',
				'59.6.136.208'
			]
		}, (node) => {
			nestNode = node;
			
			EACH(waitingHandlers, (handler) => {
				handler();
			});
		});
		
		let checkNestNodeConnected = (callback) => {
			if (nestNode === undefined) {
				waitingHandlers.push(callback);
			} else {
				callback();
			}
		};
		
		let saveComment = self.saveComment = (commentData, callback) => {
			//REQUIRED: commentData
			//REQUIRED: callback
			
			checkNestNodeConnected(() => {
				
				Contract2Object.getWalletAddress((address) => {
					
					commentData.storeName = 'Comment';
					commentData.address = address;
					commentData.createTime = nestNode.getNodeTime(new Date());
					
					Contract2Object.sign(commentData, (hash) => {
						
						console.log(hash, commentData);
						
						nestNode.saveData({
							hash : hash,
							data : commentData
						}, console.log);
					});
				});
			});
		};
		
		let getComments = self.getComments = (target, callback) => {
			//REQUIRED: target
			//REQUIRED: callback
			
			checkNestNodeConnected(() => {
				
				nestNode.getDataSet({
					storeName : 'Comment',
					target : target
				}, callback);
			});
		};
	}
});