EtherDuck.Article = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
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
			c : '글 내용'
		}));
	}
});
