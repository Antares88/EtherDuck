EtherDuck.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let cacheStore = EtherDuck.STORE('articleCache');
		
		inner.on('paramsChange', (params) => {
			
			let articleId = params.articleId;
			let category = params.category;
			
			NEXT([
			(next) => {
				
				// 글 작성
				if (articleId === undefined) {
					next(undefined, category === undefined ? cacheStore.get('category') : 'etherduck.com/' + category, cacheStore.get('title'), cacheStore.get('content'));
				}
				
				// 글 수정
				else {
					
					articleId = INTEGER(articleId);
					
					EtherDuck.Layout.setContent(DIV({
						style : {
							margin : 'auto',
							padding : '40px 0',
							fontSize : 14,
							color : '#999',
							onDisplayResize : (width, height) => {
								if (width < 800) {
									return {
										width : '90%'
									};
								} else {
									return {
										width : 732
									};
								}
							}
						},
						c : '글 내용을 불러오는 중입니다.'
					}));
					
					EtherDuck.ArticleControllerContract.read(articleId, next);
				}
			},
			
			() => {
				return (writer, category, title, content, writeTime, lastUpdateTime) => {
					
					if (articleId !== undefined) {
						
						EtherDuck.ArticleCacheManager.updateDone({
							articleId : articleId,
							category : category,
							title : title,
							content : content
						});
						
						let updateCache = EtherDuck.ArticleCacheManager.getUpdateCache(articleId);
						
						if (updateCache !== undefined) {
							category = updateCache.category;
							title = updateCache.title;
							content = updateCache.content;
						}
					}
					
					let preview;
					let textarea;
					
					EtherDuck.Layout.setContent(FORM({
						style : {
							margin : 'auto',
							padding : '40px 0',
							onDisplayResize : (width, height) => {
								if (width < 800) {
									return {
										width : '90%'
									};
								} else {
									return {
										width : 732
									};
								}
							}
						},
						c : [
						
						H1({
							style : {
								textAlign : 'center',
								fontSize : 30,
								fontWeight : 'bold',
								color : '#666'
							},
							c : '글 작성'
						}),
						
						Yogurt.Select({
							style : {
								marginTop : 20
							},
							name : 'category',
							value : category,
							options : RUN(() => {
								
								let options = [];
								
								EACH(EtherDuck.CategoryManager.getCategories(), (category) => {
									options.push(OPTION({
										value : 'etherduck.com/' + category,
										c : EtherDuck.CategoryManager.getTitle(category)
									}));
								});
								
								return options;
							}),
							on : {
								change : (e, select) => {
									if (articleId === undefined) {
										cacheStore.save({
											name : 'category',
											value : select.getValue()
										});
									}
								}
							}
						}),
						
						Yogurt.Input({
							style : {
								marginTop : 10
							},
							name : 'title',
							value : title,
							placeholder : '글 제목',
							on : {
								keyup : (e, input) => {
									if (articleId === undefined) {
										cacheStore.save({
											name : 'title',
											value : input.getValue()
										});
									}
								}
							}
						}),
						
						textarea = Yogurt.Textarea({
							style : {
								marginTop : 10,
								height : 300
							},
							name : 'content',
							value : content,
							placeholder : '글 내용',
							on : {
								keyup : (e, textarea) => {
									
									EtherDuck.MarkUp({
										dom : preview,
										md : textarea.getValue()
									});
									
									if (articleId === undefined) {
										cacheStore.save({
											name : 'content',
											value : textarea.getValue()
										});
									}
								},
								change : (e, textarea) => {
									
									EtherDuck.MarkUp({
										dom : preview,
										md : textarea.getValue()
									});
									
									if (articleId === undefined) {
										cacheStore.save({
											name : 'content',
											value : textarea.getValue()
										});
									}
								}
							}
						}),
						
						DIV({
							style : {
								marginTop : 10,
								border : '1px solid #ccc',
								padding : 5
							},
							c : INPUT({
								style : {
									width : '100%'
								},
								type : 'file',
								on : {
									change : (e, input) => {
										
										if (input.getValue() !== '') {
											
											let file = input.getEl().files[0];
											
											input.hide();
											
											let loading;
											input.after(loading = DIV({
												c : 'IFPS로 파일 업로드 중입니다...'
											}));
											
											EtherDuck.IPFSManager.upload(file, (hash) => {
												textarea.setValue(textarea.getValue() + '[@IPFS:' + hash + ':' + file.type + ']');
												
												loading.remove();
												input.show();
												input.setValue('');
											});
										}
									}
								}
							})
						}),
						
						Yogurt.Submit({
							style : {
								marginTop : 20
							},
							value : articleId === undefined ? '작성 완료' : '수정 완료'
						}),
						
						DIV({
							style : {
								marginTop : 40
							},
							c : [H3({
								style : {
									flt : 'left'
								},
								c : '미리보기'
							}), A({
								style : {
									flt : 'right',
									color : '#ffcc00',
									fontWeight : 'bold'
								},
								c : 'Markdown 사용법',
								on : {
									tap : () => {
										open(EtherDuck.HREF('markdownsample'));
									}
								}
							}), CLEAR_BOTH(),
							
							preview = DIV({
								style : {
									marginTop : 10,
									padding : '10px 16px',
									border : '1px solid #ccc'
								}
							})]
						})],
						on : {
							submit : (e, form) => {
								
								Contract2Object.checkWalletLocked((isLocked) => {
									
									if (isLocked === true) {
										Yogurt.Alert({
											msg : '이더리움 지갑이 잠겨있습니다. 지갑을 열어 잠금을 해제해주세요.'
										});
									}
									
									else {
										
										let data = form.getData();
										
										// 글 작성
										if (articleId === undefined) {
											
											EtherDuck.ArticleControllerContract.write(data, {
												
												transactionAddress : (transactionAddress) => {
													
													Yogurt.Alert({
														msg : ['트랜잭션이 등록되었습니다.', BR(), A({
															style : {
																color : '#ffcc00',
																fontWeight : 'bold'
															},
															target : '_blank',
															href : 'https://etherscan.io/tx/' + transactionAddress,
															c : 'EtherScan에서 보기'
														})]
													});
													
													cacheStore.clear();
													
													Contract2Object.getWalletAddress((walletAddress) => {
														EtherDuck.ArticleCacheManager.writeCache({
															writer : walletAddress,
															category : data.category,
															title : data.title,
															content : data.content
														});
													});
													
													EtherDuck.GO(data.category.substring('etherduck.com/'.length));
												},
												
												error : (errorMsg) => {
													
													Contract2Object.getWalletAddress((walletAddress) => {
														EtherDuck.ArticleCacheManager.writeDone({
															writer : walletAddress,
															category : data.category,
															title : data.title,
															content : data.content
														});
													});
													
													SHOW_ERROR('ArticleControllerContract.write', errorMsg, data);
												}
											});
										}
										
										// 글 수정
										else {
											
											data.articleId = articleId;
											
											EtherDuck.ArticleControllerContract.update(data, {
												
												transactionAddress : (transactionAddress) => {
													
													Yogurt.Alert({
														msg : ['트랜잭션이 등록되었습니다.', BR(), A({
															style : {
																color : '#ffcc00',
																fontWeight : 'bold'
															},
															target : '_blank',
															href : 'https://etherscan.io/tx/' + transactionAddress,
															c : 'EtherScan에서 보기'
														})]
													});
													
													EtherDuck.ArticleCacheManager.updateCache({
														articleId : articleId,
														category : data.category,
														title : data.title,
														content : data.content
													});
													
													EtherDuck.GO('article/' + articleId);
												},
												
												error : (errorMsg) => {
													
													EtherDuck.ArticleCacheManager.updateDone({
														articleId : articleId,
														category : data.category,
														title : data.title,
														content : data.content
													});
													
													SHOW_ERROR('ArticleControllerContract.update', errorMsg, data);
												}
											});
										}
									}
								});
							}
						}
					}));
					
					if (content !== undefined) {
						EtherDuck.MarkUp({
							dom : preview,
							md : content
						});
					}
				};
			}]);
		});
	}
});
