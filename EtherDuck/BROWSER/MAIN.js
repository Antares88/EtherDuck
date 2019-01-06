EtherDuck.MAIN = METHOD({

	run : () => {
		
		// 둥지 접속
		DSide.Connect({
			port : 8231,
			ips : [
				'175.207.29.156',
				'110.11.179.222',
				'59.6.136.208'
			]
		}, (node) => {
			
		});
		
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
