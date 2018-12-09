EtherDuck.ArticleCache = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self, writeCache) => {
		
		if (writeCache === undefined) {
			EtherDuck.GO('');
		}
		
		else {
			
			TITLE('이더덕 :: ' + writeCache.title);
			
			let category = writeCache.category.substring('etherduck.com/'.length);
			
			EtherDuck.Layout.setNowCategory(category);
			
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
				c : [
				
				// 제목
				H1({
					style : {
						fontSize : 30,
						fontWeight : 'bold'
					},
					c : writeCache.title
				}),
				
				// 카테고리
				H3({
					style : {
						marginTop : 8,
						fontSize : 20,
						color : '#666',
						cursor : 'pointer'
					},
					c : EtherDuck.CategoryManager.getTitle(category),
					on : {
						tap : () => {
							EtherDuck.GO(category);
						},
						mouseover : (e, a) => {
							a.addStyle({
								textDecoration : 'underline'
							});
						},
						mouseout : (e, a) => {
							a.addStyle({
								textDecoration : 'none'
							});
						}
					}
				}),
				
				// 작성자
				DIV({
					style : {
						marginTop : 30,
						fontSize : 14
					},
					c : [A({
						c : writeCache.writer,
						on : {
							tap : () => {
								EtherDuck.GO('writer/' + writeCache.writer);
							},
							mouseover : (e, a) => {
								a.addStyle({
									textDecoration : 'underline'
								});
							},
							mouseout : (e, a) => {
								a.addStyle({
									textDecoration : 'none'
								});
							}
						}
					}), ' 님 작성']
				}),
				
				DIV({
					style : {
						marginTop : 4,
						fontSize : 14
					},
					c : '트랜잭션 진행중'
				}),
				
				// 글 내용
				markdown = DIV({
					style : {
						marginTop : 20,
						paddingTop : 40,
						paddingBottom : 40,
						borderTop : '1px solid #eee'
					}
				})]
			}));
			
			EtherDuck.MarkUp({
				dom : markdown,
				md : writeCache.content
			});
		}
	}
});
