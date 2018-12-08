EtherDuck.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		inner.on('paramsChange', (params) => {
			
			let articleId = params.articleId;
			
			NEXT([
			(next) => {
				
				// 글 작성
				if (articleId === undefined) {
					next();
				}
				
				// 글 수정
				else {
					
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
					
					let preview;
					
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
							options : [OPTION({
								value : 'etherduck.com/freeboard',
								c : '자유게시판'
							})]
						}),
						
						Yogurt.Input({
							style : {
								marginTop : 10
							},
							name : 'title',
							value : title,
							placeholder : '글 제목'
						}),
						
						Yogurt.Textarea({
							style : {
								marginTop : 10,
								height : 300
							},
							name : 'content',
							value : content,
							placeholder : '글 내용',
							on : {
								keyup : (e, textarea) => {
									Markdown.MarkUpDOM({
										dom : preview,
										md : textarea.getValue()
									});
								},
								change : (e, textarea) => {
									
									Markdown.MarkUpDOM({
										dom : preview,
										md : textarea.getValue()
									});
								}
							}
						}),
						
						Yogurt.Submit({
							style : {
								marginTop : 20
							},
							value : '작성 완료'
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
													
													EtherDuck.GO(data.category.substring('etherduck.com/'.length));
												},
												
												success : () => {
													//TODO:
												}
											});
										}
										
										// 글 수정
										else {
											
											data.articleId = articleId;
											
											EtherDuck.ArticleControllerContract.update(data, {
												
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
													
													EtherDuck.GO(data.category.substring('etherduck.com/'.length));
												},
												
												success : () => {
													//TODO:
												}
											});
										}
									}
								});
							}
						}
					}));
					
					if (content !== undefined) {
						Markdown.MarkUpDOM({
							dom : preview,
							md : content
						});
					}
				};
			}]);
		});
	}
});
