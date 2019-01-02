EtherDuck.MAIN = METHOD({

	run : () => {
		
		/*DSide.Connect({
			port : 8231,
			ips : [
				'192.168.0.7'*,
				'175.207.29.156',
				'110.11.179.222',
				'59.6.136.208'*
			]
		}, (node) => {
			console.log('CONNECTED!');
			
			console.log(node.getNodeTime(new Date()));
			
			window.web3 = new Web3(Web3.givenProvider);
			
			web3.eth.getAccounts((error, accounts) => {
				
				let address = accounts[0];
				let data = {
					storeName : 'Comment',
					address : address,
					target : 'test target',
					content : 'test content',
					createTime : node.getNodeTime(new Date())
				};
				
				let sortedData = {};
				Object.keys(data).sort().forEach((key) => {
					sortedData[key] = data[key];
				});
				
				web3.eth.personal.sign(STRINGIFY(sortedData), address, (error, hash) => {
					
					node.saveData({
						hash : hash,
						data : data
					}, console.log);
				});
			});
		});*/
		
		EtherDuck.MATCH_VIEW({
			uri : '**',
			excludeURI : 'markdownsample',
			target : EtherDuck.Layout
		});
		
		EtherDuck.MATCH_VIEW({
			uri : '',
			target : EtherDuck.Home
		});
		
		EtherDuck.MATCH_VIEW({
			uri : '{category}',
			excludeURI : ['write', 'markdownsample', 'articlecache'],
			target : EtherDuck.Category
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'writer/{writer}',
			target : EtherDuck.Writer
		});
		
		EtherDuck.MATCH_VIEW({
			uri : ['write', 'write/{category}'],
			target : EtherDuck.Form
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'update/{articleId}',
			target : EtherDuck.Form
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'article/{articleId}',
			target : EtherDuck.Article
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'articlecache',
			target : EtherDuck.ArticleCache
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'markdownsample',
			target : EtherDuck.MarkdownSample
		});
	}
});
