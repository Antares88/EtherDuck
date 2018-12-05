EtherDuck.Category = CLASS({

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
			c : '카테고리'
		}));
	}
});
