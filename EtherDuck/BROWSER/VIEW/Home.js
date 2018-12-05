EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');
		
		// 지갑이 설치되어 있는 경우
		if (Contract2Object.checkWalletEnable() === true) {
			
			EtherDuck.Layout.setContent(DIV({
				style : {
					width : 700,
					margin : 'auto',
					padding : '50px 0'
				},
				c : '이더리움 덕후들을 위한 게시판 서비스, 이더덕 개발중입니다 :)'
			}));
		}
		
		// 지갑 사용 불가
		else {
			
			// 모바일에서
			if (INFO.getOSName() === 'Android' || INFO.getOSName() === 'iOS') {
				
				EtherDuck.Layout.setContent(DIV({
					style : {
						width : 700,
						margin : 'auto',
						padding : '50px 0'
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
						width : 700,
						margin : 'auto',
						padding : '50px 0'
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
