EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('EtherDuck.com');

		let wrapper = DIV({
			c : 'test'
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
