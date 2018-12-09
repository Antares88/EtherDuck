EtherDuck.MarkUp = METHOD({

	run : (params) => {
		//REQUIRED: params
		//REQUIRED: params.dom
		//REQUIRED: params.md
		
		let dom = params.dom;
		let md = params.md;
		
		let ipfsRegex = /\[\@IPFS\:([^\]\:]*)\:([^\]]*)\]/g;
		
		let html = Markdown.MarkUp(md);
		
		let ipfsHashes = {};
		
		while(true) {
		
			let ipfsMatch = ipfsRegex.exec(html);
			
			if (ipfsMatch === TO_DELETE) {
				break;
			}
			
			let ipfsHash = ipfsMatch[1];
			let type = ipfsMatch[2];
			
			html = html.substring(0, ipfsMatch.index) + '<div class="ipfs-' + ipfsHash + '"><img src="/EtherDuck/R/loading.gif"> IFPS로 부터 파일 정보를 불러오는 중입니다...</div>' + html.substring(ipfsMatch.index + ipfsMatch[0].length);
			
			ipfsHashes[ipfsHash] = type;
		}
		
		let el = dom.getEl();
		el.setAttribute('class', 'markdown-body');
		el.innerHTML = html;
		
		EACH(ipfsHashes, (type, ipfsHash) => {
			
			EtherDuck.IPFSManager.download(ipfsHash, (file) => {
				
				let objectURL = URL.createObjectURL(new Blob([file], {
					type : type
				}));
				
				EACH(document.getElementsByClassName('ipfs-' + ipfsHash), (el) => {
					
					el.innerHTML = '';
					
					let parent = DOM({
						el : el
					});
					
					// 이미지 파일인 경우
					if (type.substring(0, 6) === 'image/') {
						
						parent.append(IMG({
							src : objectURL
						}));
					}
					
					// 그 외 파일인 경우
					else {
						
						parent.append(A({
							href : objectURL,
							target : '_blank',
							c : '파일 다운로드'
						}));
					}
				});
			});
		});
	}
});
