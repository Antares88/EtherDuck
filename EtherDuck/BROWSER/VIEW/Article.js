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
				
				if (writer === '0x0000000000000000000000000000000000000000') {
					title = '삭제된 글';
					content = '삭제된 글입니다.';
				}
				
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
				if (writer !== '0x0000000000000000000000000000000000000000') {
					
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
				}
				
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
				
				EtherDuck.MarkUp({
					dom : markdown,
					md : content
				});
				
				// 글 관련 메뉴
				let menu;
				let likeButton;
				let dislikeButton;
				article.append(menu = DIV({
					c : DIV({
						style : {
							fontSize : 20,
							color : '#ccc',
							textAlign : 'right'
						},
						c : [likeButton = A({
							c : FontAwesome.GetIcon('thumbs-up'),
							on : {
								tap : () => {
									
									Contract2Object.checkWalletLocked((isLocked) => {
										
										if (isLocked === true) {
											Yogurt.Alert({
												msg : '이더리움 지갑이 잠겨있습니다. 지갑을 열어 잠금을 해제해주세요.'
											});
										}
										
										else {
											
											EtherDuck.LikeControllerContract.checkTargetVoted('etherduck.com/article/' + articleId, (voted) => {
												if (voted === true) {
													Yogurt.Alert({
														msg : '이미 좋아요/싫어요 하신 게시물입니다.'
													});
												}
												
												else {
													
													EtherDuck.LikeControllerContract.like('etherduck.com/article/' + articleId, {
														
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
														},
														
														success : () => {
															//TODO:
														}
													});
												}
											});
										}
									});
								}
							}
						}), dislikeButton = A({
							style : {
								marginLeft : 20
							},
							c : FontAwesome.GetIcon('thumbs-down'),
							on : {
								tap : () => {
									
									Contract2Object.checkWalletLocked((isLocked) => {
										
										if (isLocked === true) {
											Yogurt.Alert({
												msg : '이더리움 지갑이 잠겨있습니다. 지갑을 열어 잠금을 해제해주세요.'
											});
										}
										
										else {
											
											EtherDuck.LikeControllerContract.checkTargetVoted('etherduck.com/article/' + articleId, (voted) => {
												if (voted === true) {
													Yogurt.Alert({
														msg : '이미 좋아요/싫어요 하신 게시물입니다.'
													});
												}
												
												else {
													
													EtherDuck.LikeControllerContract.dislike('etherduck.com/article/' + articleId, {
														
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
														},
														
														success : () => {
															//TODO:
														}
													});
												}
											});
										}
									});
								}
							}
						})]
					})
				}));
				
				EtherDuck.LikeControllerContract.getLikeCountByTarget('etherduck.com/article/' + articleId, (likeCount) => {
					likeButton.append(SPAN({
						style : {
							marginLeft : 6
						},
						c : likeCount
					}));
				});
				
				EtherDuck.LikeControllerContract.getDislikeCountByTarget('etherduck.com/article/' + articleId, (dislikeCount) => {
					dislikeButton.append(SPAN({
						style : {
							marginLeft : 6
						},
						c : dislikeCount
					}));
				});
				
				Contract2Object.getWalletAddress((walletAddress) => {
					
					if (walletAddress === writer) {
						
						menu.append(Yogurt.Button({
							style : {
								marginTop : 20,
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
								marginTop : 20,
								onDisplayResize : (width, height) => {
									if (width < 800) {
										return {
											flt : 'none',
											width : 'auto'
										};
									} else {
										return {
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
				
				// 댓글 기능
				let commentList;
				article.append(DIV({
					style : {
						marginTop : 40
					},
					c : [commentList = DIV({
						c : P({
							style : {
								fontSize : 14,
								color : '#999'
							},
							c : '댓글 목록을 불러오는 중입니다...'
						})
					}), FORM({
						style : {
							marginTop : 20
						},
						c : [UUI.FULL_TEXTAREA({
							style : {
								border : '1px solid #eee'
							},
							name : 'content',
							placeholder : '댓글 입력'
						}), Yogurt.Submit({
							style : {
								marginTop : 10,
								fontSize : 14,
								padding : 10
							},
							value : '댓글 작성'
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
										
										data.target = 'etherduck.com/article/' + articleId;
										
										EtherDuck.CommentControllerContract.write(data, {
											
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
												
												form.setData({});
											},
											
											success : () => {
												//TODO:
											}
										});
									}
								});
							}
						}
					})]
				}));
				
				EtherDuck.CommentControllerContract.getCommentIdsByTarget('etherduck.com/article/' + articleId, (commentIds) => {
					
					commentList.empty();
					
					EACH(commentIds, (commentId) => {
						
						let comment;
						commentList.append(comment = DIV({
							style : {
								border : '1px solid #eee',
								padding : '8px 12px',
								marginTop : 20
							}
						}));
						
						EtherDuck.CommentControllerContract.read(commentId, (writer, target, content, writeTime, lastUpdateTime) => {
							
							if (writer === '0x0000000000000000000000000000000000000000') {
								comment.remove();
							}
							
							else {
								
								// 내용
								let contentWrapper;
								comment.append(contentWrapper = P({
									style : {
										flt : 'left'
									},
									c : content
								}));
								
								// 수정 및 삭제
								let menu;
								let likeButton;
								let dislikeButton;
								comment.append(menu = DIV({
									style : {
										flt : 'right',
										color : '#ccc'
									},
									c : [likeButton = A({
										c : FontAwesome.GetIcon('thumbs-up'),
										on : {
											tap : () => {
												
												Contract2Object.checkWalletLocked((isLocked) => {
													
													if (isLocked === true) {
														Yogurt.Alert({
															msg : '이더리움 지갑이 잠겨있습니다. 지갑을 열어 잠금을 해제해주세요.'
														});
													}
													
													else {
														
														EtherDuck.LikeControllerContract.checkTargetVoted('etherduck.com/comment/' + commentId, (voted) => {
															if (voted === true) {
																Yogurt.Alert({
																	msg : '이미 좋아요/싫어요 하신 댓글입니다.'
																});
															}
															
															else {
																
																EtherDuck.LikeControllerContract.like('etherduck.com/comment/' + commentId, {
																	
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
																	},
																	
																	success : () => {
																		//TODO:
																	}
																});
															}
														});
													}
												});
											}
										}
									}), dislikeButton = A({
										style : {
											marginLeft : 8
										},
										c : FontAwesome.GetIcon('thumbs-down'),
										on : {
											tap : () => {
												
												Contract2Object.checkWalletLocked((isLocked) => {
													
													if (isLocked === true) {
														Yogurt.Alert({
															msg : '이더리움 지갑이 잠겨있습니다. 지갑을 열어 잠금을 해제해주세요.'
														});
													}
													
													else {
														
														EtherDuck.LikeControllerContract.checkTargetVoted('etherduck.com/comment/' + commentId, (voted) => {
															if (voted === true) {
																Yogurt.Alert({
																	msg : '이미 좋아요/싫어요 하신 댓글입니다.'
																});
															}
															
															else {
																
																EtherDuck.LikeControllerContract.dislike('etherduck.com/comment/' + commentId, {
																	
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
																	},
																	
																	success : () => {
																		//TODO:
																	}
																});
															}
														});
													}
												});
											}
										}
									})]
								}));
								
								EtherDuck.LikeControllerContract.getLikeCountByTarget('etherduck.com/comment/' + commentId, (likeCount) => {
									likeButton.append(SPAN({
										style : {
											marginLeft : 4
										},
										c : likeCount
									}));
								});
								
								EtherDuck.LikeControllerContract.getDislikeCountByTarget('etherduck.com/comment/' + commentId, (dislikeCount) => {
									dislikeButton.append(SPAN({
										style : {
											marginLeft : 4
										},
										c : dislikeCount
									}));
								});
								
								Contract2Object.getWalletAddress((walletAddress) => {
									
									if (walletAddress === writer) {
										
										menu.append(A({
											style : {
												marginLeft : 8
											},
											c : FontAwesome.GetIcon('edit'),
											on : {
												tap : () => {
													
													Yogurt.Prompt({
														msg : '댓글 수정',
														value : content
													}, (contentToUpdate) => {
														
														EtherDuck.CommentControllerContract.update({
															commentId : commentId,
															content : contentToUpdate
														}, {
															
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
																
																// 우선 댓글 내용 변경
																content = contentToUpdate;
																
																contentWrapper.empty();
																contentWrapper.append(content);
															},
															
															success : () => {
																//TODO:
															}
														});
													});
												}
											}
										}));
										
										menu.append(A({
											style : {
												marginLeft : 8
											},
											c : FontAwesome.GetIcon('trash'),
											on : {
												tap : () => {
													
													Yogurt.Confirm({
														msg : '댓글을 삭제하시겠습니까?'
													}, () => {
														
														EtherDuck.CommentControllerContract.remove(commentId, {
															
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
																
																// 우선 댓글 그냥 삭제
																comment.remove();
															},
															
															success : () => {
																//TODO:
															}
														});
													});
												}
											}
										}));
									}
								});
								
								comment.append(CLEAR_BOTH());
								
								// 작성자 및 작성일
								let writeTimeCal = CALENDAR(new Date(writeTime * 1000));
								
								comment.append(DIV({
									style : {
										marginTop : 8,
										fontSize : 12
									},
									c : [DIV({
										style : {
											flt : 'left'
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
									}), DIV({
										style : {
											flt : 'right'
										},
										c : writeTimeCal.getYear(true) + '-' + writeTimeCal.getMonth(true) + '-' + writeTimeCal.getDate(true) + ' ' + writeTimeCal.getHour(true) + ':' + writeTimeCal.getMinute(true)
									}), CLEAR_BOTH()]
								}));
							}
						});
					});
				});
			});
		});
	}
});
