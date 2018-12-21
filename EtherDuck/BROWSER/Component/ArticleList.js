EtherDuck.ArticleList = CLASS({

	preset : () => {
		return DIV;
	},

	init : (inner, self, params) => {
		//REQUIRED: params
		//REQUIRED: params.articleIds
		//OPTIONAL: params.category
		//OPTIONAL: params.writer
		
		let articleIds = params.articleIds;
		
		let listCategory = params.category;
		let listWriter = params.writer;
		
		EACH(EtherDuck.ArticleControllerContract.getWriteCaches(listCategory === undefined ? undefined : 'etherduck.com/' + listCategory), (writeCache, key) => {
			
			let article;
			self.append(article = DIV({
				style : {
					marginTop : 40
				}
			}));
			
			let category = writeCache.category.substring('etherduck.com/'.length);
			let title = writeCache.title;
			
			// 제목
			article.append(H3({
				style : {
					fontSize : 20,
					fontWeight : 'bold'
				},
				c : listCategory === category ? A({
					c : title,
					on : {
						tap : () => {
							EtherDuck.GO({
								uri : 'articlecache',
								data : writeCache
							});
						}
					}
				}) : [A({
					style : {
						fontSize : 14,
						color : '#666',
						fontWeight : 'normal'
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
				}), BR(), A({
					c : title,
					on : {
						tap : () => {
							EtherDuck.GO({
								uri : 'articlecache',
								data : writeCache
							});
						}
					}
				})]
			}));
			
			let content = writeCache.content.replace(/\n/g, ' ');
			
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
							EtherDuck.GO({
								uri : 'articlecache',
								data : writeCache
							});
						}
					}
				})
			}));
			
			let writer = writeCache.writer;
			
			// 작성자
			article.append(DIV({
				style : {
					marginTop : 12,
					fontSize : 12
				},
				c : listWriter === writer ? writer : [A({
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
			
			article.append(DIV({
				style : {
					marginTop : 4,
					fontSize : 12
				},
				c : '트랜잭션 진행중'
			}));
		});
		
		EACH(articleIds, (articleId) => {
			
			let article;
			self.append(article = DIV({
				style : {
					marginTop : 40
				}
			}));
			
			EtherDuck.ArticleControllerContract.read(articleId, (writer, fullCategory, title, _content, writeTime, lastUpdateTime) => {
				
				let updateCache = EtherDuck.ArticleControllerContract.getUpdateCache(articleId);
				
				if (updateCache !== undefined) {
					fullCategory = updateCache.category;
					title = updateCache.title;
					_content = updateCache.content;
				}
				
				if (EtherDuck.ArticleControllerContract.checkRemoveCache(articleId) || writer === '0x0000000000000000000000000000000000000000') {
					article.remove();
				}
				
				else {
					
					let category = fullCategory.substring('etherduck.com/'.length);
					
					// 제목
					article.append(H3({
						style : {
							fontSize : 20,
							fontWeight : 'bold'
						},
						c : listCategory === category ? A({
							c : title,
							on : {
								tap : () => {
									EtherDuck.GO('article/' + articleId);
								}
							}
						}) : [A({
							style : {
								fontSize : 14,
								color : '#666',
								fontWeight : 'normal'
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
						}), BR(), A({
							c : title,
							on : {
								tap : () => {
									EtherDuck.GO('article/' + articleId);
								}
							}
						})]
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
						c : listWriter === writer ? writer : [A({
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
							fontSize : 12
						},
						c : writeTimeCal.getYear(true) + '-' + writeTimeCal.getMonth(true) + '-' + writeTimeCal.getDate(true) + ' ' + writeTimeCal.getHour(true) + ':' + writeTimeCal.getMinute(true)
					}));
				}
			});
		});
	}
});
