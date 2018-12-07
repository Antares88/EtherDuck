EtherDuck.Category = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');

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
			c : '카테고리'
		}));
	}
});
