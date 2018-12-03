EtherDuck.Home = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		TITLE('이더덕 :: 이더리움 덕후 게시판');

		let wrapper = DIV({
			c : '이더리움 덕후들을 위한 게시판 서비스, 이더덕 개발중입니다 :)'
		}).appendTo(BODY);

		inner.on('close', () => {
			wrapper.remove();
		});
	}
});
