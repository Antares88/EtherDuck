EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');
		
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
			c : [P({
				style : {
					textAlign : 'center'
				},
				c : [
					'이더리움 덕후들을 위한 게시판 서비스, 이더덕!\n',
					SPAN({
						style : {
							color : '#999'
						},
						c : 'v1.0'
					})
				]
			}), list = DIV({
				c : P({
					style : {
						marginTop : 40,
						fontSize : 14,
						color : '#999'
					},
					c : [IMG({
						src : '/EtherDuck/R/loading.gif'
					}), ' 글 목록을 불러오는 중입니다...']
				})
			})]
		}));
		
		let articleIds = [];
		NEXT(EtherDuck.CategoryManager.getCategories(), [(category, next) => {
			
			EtherDuck.ArticleControllerContract.getArticleIdsByCategory('etherduck.com/' + category, (_articleIds) => {
				EACH(_articleIds, (articleId) => {
					if (CHECK_IS_IN({
						array : articleIds,
						value : articleId
					}) !== true) {
						articleIds.push(articleId);
					}
				});
				next();
			});
		},
		
		() => {
			return () => {
				
				list.empty();
				
				EtherDuck.ArticleList({
					articleIds : articleIds.sort().reverse()
				}).appendTo(list);
			};
		}]);
	}
});
