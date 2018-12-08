EtherDuck.Layout = CLASS((cls) => {
	
	let menuLayoutContent;
	
	let setContent = cls.setContent = (content) => {
		menuLayoutContent.empty();
		menuLayoutContent.append(content);
	};
	
	return {
		
		preset : () => {
			return VIEW;
		},
		
		init : (inner, self) => {
			
			let menuLayout = Yogurt.MenuLayout({
				
				toolbar : Yogurt.Toolbar({
					contentStyle : {
						boxShadow : '0 2px 10px rgba(0, 0, 0, .1)'
					},
					title : A({
						c : '이더덕',
						on : {
							tap : () => {
								EtherDuck.GO('');
							}
						}
					}),
					left : Yogurt.ToolbarButton({
						style : {
							padding : '16px'
						},
						icon : FontAwesome.GetIcon('list'),
						on : {
							tap : (e) => {
								menuLayout.toggleLeftMenu();
							}
						}
					}),
					right : Yogurt.ToolbarButton({
						style : {
							padding : '16px'
						},
						icon : FontAwesome.GetIcon('pen'),
						on : {
							tap : () => {
								EtherDuck.GO('write');
							}
						}
					})
				}),
				
				leftMenu : DIV({
					style : {
						color : '#fff'
					},
					c : RUN(() => {
						
						let menus = [A({
							style : {
								display : 'block',
								padding : '15px 20px',
								fontSize : 14
							},
							c : 'HOME',
							on : {
								tap : () => {
									EtherDuck.GO('');
									menuLayout.hideLeftMenu();
								}
							}
						})];
						
						EACH(EtherDuck.CategoryManager.getCategories(), (category) => {
							menus.push(A({
								style : {
									display : 'block',
									padding : '15px 20px',
									fontSize : 14
								},
								c : EtherDuck.CategoryManager.getTitle(category),
								on : {
									tap : () => {
										EtherDuck.GO(category);
										menuLayout.hideLeftMenu();
									}
								}
							}));
						});
						
						return menus;
					})
				}),
				
				c : [menuLayoutContent = DIV()]
				
			}).appendTo(BODY);
			
			inner.on('close', () => {
				menuLayout.remove();
				menuLayoutContent = undefined;
			});
		}
	};
});
