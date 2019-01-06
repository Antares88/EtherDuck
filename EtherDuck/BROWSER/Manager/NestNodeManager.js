EtherDuck.NestNodeManager = OBJECT({
	
	init : (inner, self) => {
		
		let nestNode;
		
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
		});
		
		let saveComment = self.saveComment = (commentData, callback) => {
			//REQUIRED: commentData
			//REQUIRED: callback
			
			if (nestNode === undefined) {
				Yogurt.Alert({
					msg : '아직 둥지에 연결되지 않았습니다. 잠시 기다려주시거나, 새로고침 해 주시기 바랍니다.'
				});
			}
			
			else {
				
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
			}
		};
	}
});