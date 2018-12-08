EtherDuck.ArticleManager = OBJECT({
	
	init : (inner, self) => {
		
		let writeRegist = self.writeRegist = (params) => {
			//REQUIRED: params
			//REQUIRED: params.transactionAddress
			//REQUIRED: params.data
			
			let transactionAddress = params.transactionAddress;
			let data = params.data;
			
			
		};
		
		let writeNotify = self.writeNotify = (transactionAddress) => {
			//REQUIRED: transactionAddress
			
			
		};
	}
});