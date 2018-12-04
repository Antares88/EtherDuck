EtherDuck.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		EtherDuck.Layout.setContent(DIV({
			c : '글 작성 폼'
		}));
	}
});
