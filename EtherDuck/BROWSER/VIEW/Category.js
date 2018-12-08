EtherDuck.Category = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let category = params.category;
			
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
				
				EACH(articleIds, (articleId) => {
					
					let article;
					list.append(article = DIV({
						style : {
							marginTop : 40
						}
					}));
					
					EtherDuck.ArticleControllerContract.read(articleId, (writer, category, title, _content, writeTime, lastUpdateTime) => {
						
						// 제목
						article.append(H3({
							style : {
								fontSize : 20,
								fontWeight : 'bold'
							},
							c : A({
								c : title,
								on : {
									tap : () => {
										EtherDuck.GO('article/' + articleId);
									}
								}
							})
						}));
						
						let content = _content.replace(/\n/g, ' ');
						
						// 내용
						article.append(P({
							style : {
								marginTop : 8,
								color : '#999'
							},
							c : A({
								c : content.length > 130 ? content.substring(0, 130) + '...' : content,
								on : {
									tap : () => {
										EtherDuck.GO('article/' + articleId);
									}
								}
							})
						}));
						
						// 작성자
						article.append(DIV({
							style : {
								marginTop : 12,
								fontSize : 12
							},
							c : writer + ' 님 작성'
						}));
						
						// 작성일
						let writeTimeCal = CALENDAR(new Date(writeTime * 1000));
						
						article.append(DIV({
							style : {
								marginTop : 4,
								fontSize : 12
							},
							c : writeTimeCal.getYear(true) + '-' + writeTimeCal.getMonth(true) + '-' + writeTimeCal.getDate(true) + ' ' + writeTimeCal.getHour(true) + ':' + writeTimeCal.getMinute(true)
						}));
					});
				});
			});
		});
	}
});
