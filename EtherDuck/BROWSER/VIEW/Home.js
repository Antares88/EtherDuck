EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');
		
		// 지갑이 설치되어 있는 경우
		if (Contract2Object.checkWalletEnable() === true) {
			
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
					c : '이더리움 덕후들을 위한 게시판 서비스, 이더덕!'
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
					
					EACH(articleIds, (articleId) => {
						
						let article;
						list.append(article = DIV({
							style : {
								marginTop : 40
							}
						}));
						
						EtherDuck.ArticleControllerContract.read(articleId, (writer, fullCategory, title, _content, writeTime, lastUpdateTime) => {
							
							let category = fullCategory.substring('etherduck.com/'.length);
							
							// 제목
							article.append(H3({
								style : {
									fontSize : 20,
									fontWeight : 'bold'
								},
								c : [A({
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
									fontSize : 12
								},
								c : writeTimeCal.getYear(true) + '-' + writeTimeCal.getMonth(true) + '-' + writeTimeCal.getDate(true) + ' ' + writeTimeCal.getHour(true) + ':' + writeTimeCal.getMinute(true)
							}));
						});
					});
				};
			}]);
		}
		
		// 지갑 사용 불가
		else {
			
			// 모바일에서
			if (INFO.getOSName() === 'Android' || INFO.getOSName() === 'iOS') {
				
				EtherDuck.Layout.setContent(DIV({
					style : {
						margin : 'auto',
						padding : '50px 0',
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
						c : [
							'모바일에서 접속하셨군요! 반갑습니다.\n',
							'그런데 손님, 이더덕은 이더리움 기반 서비스라 이더리움 네트워크에 연결이 되어야 사용이 가능하답니다! ㅜ.ㅜ\n',
							'괜찮으시면 ', A({
								style : {
									color : '#ffcc00',
									fontWeight : 'bold'
								},
								href : INFO.getOSName() === 'iOS' ? 'https://itunes.apple.com/app/cipher-browser-for-ethereum/id1294572970?ls=1&mt=8' : 'https://play.google.com/store/apps/details?id=com.cipherbrowser.cipher',
								c : 'Cipher Browser'
							}) ,'를 다운로드 받아 사용해 보시겠어요?'
						]
					})]
				}));
			}
			
			else {
				
				EtherDuck.Layout.setContent(DIV({
					style : {
						margin : 'auto',
						padding : '50px 0',
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
						c : [
							'PC에서 접속하셨군요! 반갑습니다.\n',
							'그런데 손님, 이더덕은 이더리움 기반 서비스라 이더리움 네트워크에 연결이 되어야 사용이 가능하답니다! ㅜ.ㅜ\n',
							'괜찮으시면 ', A({
								style : {
									color : '#ffcc00',
									fontWeight : 'bold'
								},
								href : 'https://metamask.io/',
								c : 'MetaMask'
							}) ,'를 다운로드 받아 사용해 보시겠어요?'
						]
					})]
				}));
			}
		}
	}
});
