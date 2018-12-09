EtherDuck.Category = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let category = params.category;
			
			EtherDuck.Layout.setNowCategory(category);
			
			let title = EtherDuck.CategoryManager.getTitle(category);
			
			TITLE('이더덕 :: ' + title);
			
			let list;
			EtherDuck.Layout.setContent(DIV({
				style : {
					margin : 'auto',
					padding : '60px 0',
					onDisplayResize : (width, height) => {
						if (width < 800) {
							return {
								width : '90%'
							};
						} else {
							return {
								width : 700
							};
						}
					}
				},
				c : [H1({
					style : {
						fontSize : 30,
						fontWeight : 'bold',
						borderBottom : '1px solid #eee',
						paddingBottom : 30
					},
					c : title
				}), list = DIV({
					c : P({
						style : {
							marginTop : 40,
							fontSize : 14,
							color : '#999'
						},
						c : '글 목록을 불러오는 중입니다...'
					})
				})]
			}));
			
			EtherDuck.ArticleControllerContract.getArticleIdsByCategory('etherduck.com/' + category, (articleIds) => {
				
				list.empty();
				
				EtherDuck.ArticleList({
					articleIds : articleIds.reverse(),
					category : category
				}).appendTo(list);
			});
		});
	}
});
