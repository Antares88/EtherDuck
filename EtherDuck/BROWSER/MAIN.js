EtherDuck.MAIN = METHOD({

	run : () => {
		
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
			excludeURI : ['write', 'markdownsample'],
			target : EtherDuck.Category
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
		
		EtherDuck.MATCH_VIEW({
			uri : 'markdownsample',
			target : EtherDuck.MarkdownSample
		});
	}
});
