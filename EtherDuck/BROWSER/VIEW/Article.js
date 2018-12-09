EtherDuck.Article = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		const URL_REGEX = /(http|https|ftp|telnet|news|mms):\/[^\"\'\s()]+/i;
		
		const replaceLink = (content) => {
			
			let children = [];
			
			EACH(content.split(' '), (content, i) => {
				
				if (i > 0) {
					children.push(' ');
				}
				
				// 링크를 찾아 교체합니다.
				let replaceLink = () => {
					
					let match = content.match(URL_REGEX);
					if (match === TO_DELETE) {
						children.push(content);
					}
					
					else {
						
						let url = match[0];
						if (url.indexOf(' ') !== -1) {
							url = url.substring(0, url.indexOf(' '));
						}
						
						let index = content.indexOf(url);
						
						children.push(content.substring(0, index));
						
						content = content.substring(index + url.length);
						
						children.push(A({
							style : {
								color : '#4183c4'
							},
							target : '_blank',
							href : url,
							c : url,
							on : {
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
						
						replaceLink();
					}
				};
				
				replaceLink();
			});
			
			return children;
		};
		
		inner.on('paramsChange', (params) => {
			
			let articleId = INTEGER(params.articleId);
			
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
					c : [IMG({
						src : '/EtherDuck/R/loading.gif'
					}), ' 글 내용을 불러오는 중입니다...']
				})
			}));
			
			EtherDuck.ArticleControllerContract.read(articleId, (writer, fullCategory, title, content, writeTime, lastUpdateTime) => {
				article.empty();
				
				EtherDuck.ArticleCacheManager.updateDone({
					articleId : articleId,
					category : fullCategory,
					title : title,
					content : content
				});
				
				let updateCache = EtherDuck.ArticleCacheManager.getUpdateCache(articleId);
				
				if (updateCache !== undefined) {
					fullCategory = updateCache.category;
					title = updateCache.title;
					content = updateCache.content;
				}
				
				let isRemoved = false;
				
				if (EtherDuck.ArticleCacheManager.checkRemoveCache(articleId) || writer === '0x0000000000000000000000000000000000000000') {
					
					fullCategory = '';
					title = '삭제된 글';
					content = '삭제된 글입니다.';
					
					isRemoved = true;
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
				
				EtherDuck.Layout.setNowCategory(category);
				
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
				if (isRemoved !== true) {
					
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
				
				if (isRemoved !== true) {
					
					// 글 관련 메뉴
					let menu;
					let likeCountPanel;
					let dislikeCountPanel;
					article.append(menu = DIV({
						c : DIV({
							style : {
								fontSize : 20,
								color : '#ccc',
								textAlign : 'right'
							},
							c : [A({
								c : [FontAwesome.GetIcon('thumbs-up'), likeCountPanel = SPAN({
									style : {
										marginLeft : 6
									}
								})],
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
																
																// 우선 좋아요 1 증가
																likeCount += 1;
																
																likeCountPanel.empty();
																likeCountPanel.append(likeCount);
															}
														});
													}
												});
											}
										});
									}
								}
							}), A({
								style : {
									marginLeft : 20
								},
								c : [FontAwesome.GetIcon('thumbs-down'), dislikeCountPanel = SPAN({
									style : {
										marginLeft : 6
									}
								})],
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
																
																// 우선 싫어요 1 증가
																dislikeCount += 1;
																
																dislikeCountPanel.empty();
																dislikeCountPanel.append(dislikeCount);
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
					
					let likeCount = 0;
					EtherDuck.LikeControllerContract.getLikeCountByTarget('etherduck.com/article/' + articleId, (_likeCount) => {
						
						likeCount = _likeCount;
						
						likeCountPanel.empty();
						likeCountPanel.append(likeCount);
					});
					
					let dislikeCount = 0;
					EtherDuck.LikeControllerContract.getDislikeCountByTarget('etherduck.com/article/' + articleId, (_dislikeCount) => {
						
						dislikeCount = _dislikeCount;
						
						dislikeCountPanel.empty();
						dislikeCountPanel.append(dislikeCount);
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
												
												EtherDuck.ArticleCacheManager.removeCache(articleId);
											},
											
											error : (errorMsg) => {
												
												EtherDuck.ArticleCacheManager.removeDone(articleId);
												
												SHOW_ERROR('ArticleControllerContract.remove', errorMsg, articleId);
											}
										});
									}
								}
							}));
							
							menu.append(CLEAR_BOTH());
						}
					});
					
					let cachedComments = {};
					let createCachedComment = (writeCache, key) => {
						
						let comment;
						cachedCommentList.append(comment = DIV({
							style : {
								border : '1px solid #eee',
								padding : '8px 12px',
								marginTop : 20
							}
						}));
						
						cachedComments[key] = comment;
						
						// 내용
						comment.append(P({
							c : writeCache.content
						}));
						
						// 작성자
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
							}), DIV({
								style : {
									flt : 'right'
								},
								c : '트랜잭션 진행중'
							}), CLEAR_BOTH()]
						}));
					};
					
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
								c : [IMG({
									src : '/EtherDuck/R/loading.gif'
								}), ' 댓글 목록을 불러오는 중입니다...']
							})
						}), cachedCommentList = DIV(), FORM({
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
													
													Contract2Object.getWalletAddress((walletAddress) => {
														
														let writeCache = {
															writer : walletAddress,
															target : data.target,
															content : data.content
														};
														
														let key = EtherDuck.CommentCacheManager.writeCache(writeCache);
														
														createCachedComment(writeCache, key);
													});
												},
												
												error : (errorMsg) => {
													
													Contract2Object.getWalletAddress((walletAddress) => {
														EtherDuck.CommentCacheManager.writeDone({
															writer : walletAddress,
															target : data.target,
															content : data.content
														});
													});
													
													SHOW_ERROR('CommentControllerContract.write', errorMsg, data);
												}
											});
										}
									});
								}
							}
						})]
					}));
					
					EACH(EtherDuck.CommentCacheManager.getWriteCaches('etherduck.com/article/' + articleId), createCachedComment);
					
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
								
								let key = EtherDuck.CommentCacheManager.writeDone({
									writer : writer,
									target : target,
									content : content
								});
								
								if (cachedComments[key] !== undefined) {
									cachedComments[key].remove();
									delete cachedComments[key];
								}
								
								EtherDuck.CommentCacheManager.updateDone({
									commentId : commentId,
									content : content
								});
								
								let updateCache = EtherDuck.CommentCacheManager.getUpdateCache(commentId);
								
								if (updateCache !== undefined) {
									content = updateCache.content;
								}
								
								if (EtherDuck.CommentCacheManager.checkRemoveCache(commentId) || writer === '0x0000000000000000000000000000000000000000') {
									comment.remove();
								}
								
								else {
									
									// 내용
									let contentWrapper;
									comment.append(contentWrapper = P({
										style : {
											flt : 'left'
										},
										c : replaceLink(content)
									}));
									
									// 수정 및 삭제
									let menu;
									let likeCountPanel;
									let dislikeCountPanel;
									comment.append(menu = DIV({
										style : {
											flt : 'right',
											color : '#ccc'
										},
										c : [A({
											c : [FontAwesome.GetIcon('thumbs-up'), likeCountPanel = SPAN({
												style : {
													marginLeft : 4
												}
											})],
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
																			
																			likeCount += 1;
																			
																			likeCountPanel.empty();
																			likeCountPanel.append(likeCount);
																		}
																	});
																}
															});
														}
													});
												}
											}
										}), A({
											style : {
												marginLeft : 8
											},
											c : [FontAwesome.GetIcon('thumbs-down'), dislikeCountPanel = SPAN({
												style : {
													marginLeft : 4
												}
											})],
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
																			
																			dislikeCount += 1;
																			
																			dislikeCountPanel.empty();
																			dislikeCountPanel.append(dislikeCount);
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
									
									let likeCount = 0;
									EtherDuck.LikeControllerContract.getLikeCountByTarget('etherduck.com/comment/' + commentId, (_likeCount) => {
										
										likeCount = _likeCount;
										
										likeCountPanel.empty();
										likeCountPanel.append(likeCount);
									});
									
									let dislikeCount = 0;
									EtherDuck.LikeControllerContract.getDislikeCountByTarget('etherduck.com/comment/' + commentId, (_dislikeCount) => {
										
										dislikeCount = _dislikeCount;
										
										dislikeCountPanel.empty();
										dislikeCountPanel.append(dislikeCount);
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
																	contentWrapper.append(replaceLink(content));
																	
																	EtherDuck.CommentCacheManager.updateCache({
																		commentId : commentId,
																		content : contentToUpdate
																	});
																},
																
																error : (errorMsg) => {
																	
																	EtherDuck.CommentCacheManager.updateDone({
																		commentId : commentId,
																		content : contentToUpdate
																	});
																	
																	SHOW_ERROR('CommentControllerContract.update', errorMsg, {
																		commentId : commentId,
																		content : contentToUpdate
																	});
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
																	
																	EtherDuck.CommentCacheManager.removeCache(commentId);
																},
																
																error : (errorMsg) => {
																	
																	EtherDuck.CommentCacheManager.removeDone(commentId);
																	
																	SHOW_ERROR('CommentControllerContract.remove', errorMsg, commentId);
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
				}
			});
		});
	}
});
