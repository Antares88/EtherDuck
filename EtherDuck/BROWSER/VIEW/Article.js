EtherDuck.Article = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		EtherDuck.Layout.setContent(DIV({
			style : {
				width : 700,
				margin : 'auto',
				padding : '50px 0'
			},
			c : '글 내용'
		}));
	}
});
