EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');

		EtherDuck.Layout.setContent(DIV({
			style : {
				width : 700,
				margin : 'auto',
				padding : '50px 0'
			},
			c : '이더리움 덕후들을 위한 게시판 서비스, 이더덕 개발중입니다 :)'
		}));
	}
});
