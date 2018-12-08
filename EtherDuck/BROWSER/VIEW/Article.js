EtherDuck.Article = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let articleId = params.articleId;
			
			let article;
			EtherDuck.Layout.setContent(article = DIV({
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
				c : P({
					style : {
						fontSize : 14,
						color : '#999'
					},
					c : '글 내용을 불러오는 중입니다...'
				})
			}));
			
			EtherDuck.ArticleControllerContract.read(articleId, (writer, category, title, content, writeTime, lastUpdateTime) => {
				article.empty();
				
				// 제목
				article.append(H1({
					style : {
						fontSize : 30,
						fontWeight : 'bold'
					},
					c : title
				}));
				
				// 카테고리
				article.append(H3({
					style : {
						marginTop : 8,
						fontSize : 20,
						color : '#666'
					},
					c : EtherDuck.CategoryManager.getTitle(category)
				}));
				
				// 작성자
				article.append(DIV({
					style : {
						marginTop : 30,
						fontSize : 14
					},
					c : writer + ' 님 작성'
				}));
				
				// 작성일
				let writeTimeCal = CALENDAR(new Date(writeTime * 1000));
				
				article.append(DIV({
					style : {
						marginTop : 4,
						fontSize : 14
					},
					c : writeTimeCal.getYear(true) + '-' + writeTimeCal.getMonth(true) + '-' + writeTimeCal.getDate(true) + ' ' + writeTimeCal.getHour(true) + ':' + writeTimeCal.getMinute(true)
				}));
				
				// 글 내용
				let markdown;
				article.append(markdown = DIV({
					style : {
						marginTop : 20,
						paddingTop : 40,
						borderTop : '1px solid #eee'
					}
				}));
				
				Markdown.MarkUpDOM({
					dom : markdown,
					md : content
				});
			});
		});
	}
});
