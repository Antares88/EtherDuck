EtherDuck.Form = CLASS({

	preset : () => {
		return VIEW;
	},

	init : (inner, self) => {
		
		let preview;
		
		EtherDuck.Layout.setContent(DIV({
			style : {
				width : 732,
				margin : 'auto',
				padding : '40px 0'
			},
			c : [
			
			H1({
				style : {
					textAlign : 'center',
					fontSize : 30,
					fontWeight : 'bold',
					color : '#666'
				},
				c : '글 작성'
			}),
			
			Yogurt.Select({
				style : {
					marginTop : 20
				},
				options : [OPTION({
					value : 'etherduck.com/freeboard',
					c : '자유게시판'
				})]
			}),
			
			Yogurt.Input({
				style : {
					marginTop : 10
				},
				placeholder : '글 제목'
			}),
			
			Yogurt.Textarea({
				style : {
					marginTop : 10,
					height : 300
				},
				placeholder : '글 내용',
				on : {
					keyup : (e, textarea) => {
						Markdown.MarkUpDOM({
							dom : preview,
							md : textarea.getValue()
						});
					},
					change : (e, textarea) => {
						
						Markdown.MarkUpDOM({
							dom : preview,
							md : textarea.getValue()
						});
					}
				}
			}),
			
			Yogurt.Submit({
				style : {
					marginTop : 20
				},
				value : '작성 완료'
			}),
			
			DIV({
				style : {
					marginTop : 40
				},
				c : [H3({
					style : {
						flt : 'left'
					},
					c : '미리보기'
				}), A({
					style : {
						flt : 'right',
						color : '#ffcc00'
					},
					c : 'Markdown 사용법',
					on : {
						tap : () => {
							open(EtherDuck.HREF('markdownsample'));
						}
					}
				}), CLEAR_BOTH(),
				
				preview = DIV({
					style : {
						marginTop : 10,
						padding : '10px 16px',
						border : '1px solid #ccc'
					}
				})]
			})]
		}));
	}
});
