EtherDuck.CategoryManager = OBJECT({
	
	init : (inner, self) => {
		
		let categories = [
			'freeboard',
			'ethnews',
			'etherduck'
		];
		
		let getCategories = self.getCategories = () => {
			return categories;
		};
		
		let getTitle = self.getTitle = (category) => {
			//REQUIRED: category
			
			if (category === 'freeboard') {
				return '자유게시판';
			} else if (category === 'ethnews') {
				return '이더리움 뉴스';
			} else if (category === 'etherduck') {
				return '이더덕 개발/건의';
			}
			
			return '알 수 없는 게시판';
		};
	}
});