EtherDuck.Writer = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let writer = params.writer;
			
			TITLE('이더덕 :: ' + writer + ' 님의 글 목록');
			
			EtherDuck.Layout.setNowCategory(undefined);
			
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
						fontSize : 20,
						fontWeight : 'bold',
						borderBottom : '1px solid #eee',
						paddingBottom : 30
					},
					c : writer + ' 님의 글 목록'
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
			
			EtherDuck.ArticleControllerContract.getArticleIdsByWriter(writer, (articleIds) => {
				
				list.empty();
				
				EtherDuck.ArticleList({
					articleIds : articleIds.reverse(),
					writer : writer
				}).appendTo(list);
			});
		});
	}
});
