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
			
			EtherDuck.ArticleControllerContract.read(articleId, (writer, fullCategory, title, content, writeTime, lastUpdateTime) => {
				article.empty();
				
				TITLE('이더덕 :: ' + title);
				
				// 제목
				article.append(H1({
					style : {
						fontSize : 30,
						fontWeight : 'bold'
					},
					c : title
				}));
				
				let category = fullCategory.substring('etherduck.com/'.length);
				
				// 카테고리
				article.append(H3({
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
				}));
				
				// 작성자
				article.append(DIV({
					style : {
						marginTop : 30,
						fontSize : 14
					},
					c : [A({
						c : writer,
						on : {
							tap : () => {
								EtherDuck.GO('writer/' + writer);
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
						paddingBottom : 40,
						borderTop : '1px solid #eee'
					}
				}));
				
				Markdown.MarkUpDOM({
					dom : markdown,
					md : content
				});
				
				// 글 수정 버튼
				let menu;
				article.append(menu = DIV());
				
				Contract2Object.getWalletAddress((walletAddress) => {
					
					if (walletAddress === writer) {
						
						menu.append(Yogurt.Button({
							style : {
								onDisplayResize : (width, height) => {
									if (width < 800) {
										return {
											flt : 'none',
											width : 'auto'
										};
									} else {
										return {
											flt : 'left',
											width : 300
										};
									}
								}
							},
							title : '글 수정',
							on : {
								tap : () => {
									EtherDuck.GO('update/' + articleId);
								}
							}
						}));
						
						menu.append(Yogurt.Button({
							style : {
								onDisplayResize : (width, height) => {
									if (width < 800) {
										return {
											marginTop : 10,
											flt : 'none',
											width : 'auto'
										};
									} else {
										return {
											marginTop : 0,
											flt : 'right',
											width : 300
										};
									}
								}
							},
							title : '글 삭제',
							on : {
								tap : () => {
									EtherDuck.ArticleControllerContract.remove(articleId, {
										
										transactionAddress : (transactionAddress) => {
											
											Yogurt.Alert({
												msg : ['트랜잭션이 등록되었습니다. 트랜잭션이 완료되면, 자동으로 글이 나타납니다.', BR(), A({
													style : {
														color : '#ffcc00',
														fontWeight : 'bold'
													},
													target : '_blank',
													href : 'https://etherscan.io/tx/' + transactionAddress,
													c : 'EtherScan에서 보기'
												})]
											});
											
											EtherDuck.GO(category);
										},
										
										success : () => {
											//TODO:
										}
									});
								}
							}
						}));
						
						menu.append(CLEAR_BOTH());
					}
				});
			});
		});
	}
});
