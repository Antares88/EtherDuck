EtherDuck.MAIN = METHOD({

	run : () => {
		
		EtherDuck.MATCH_VIEW({
			uri : '**',
			target : EtherDuck.Layout
		});
		
		EtherDuck.MATCH_VIEW({
			uri : '',
			target : EtherDuck.Home
		});
		
		EtherDuck.MATCH_VIEW({
			uri : 'write',
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
	}
});
