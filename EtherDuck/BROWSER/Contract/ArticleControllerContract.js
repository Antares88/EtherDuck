EtherDuck.ArticleControllerContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":false,"inputs":[{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"write","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"network","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"writer","type":"address"}],"name":"getArticleIdsByWriter","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gasInfos","outputs":[{"name":"writer","type":"address"},{"name":"behavior","type":"string"},{"name":"articleId","type":"uint256"},{"name":"gasUsed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"category","type":"string"}],"name":"getArticleIdsByCategory","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getArticleCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"articleId","type":"uint256"}],"name":"read","outputs":[{"name":"writer","type":"address"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"writeTime","type":"uint256"},{"name":"lastUpdateTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGasInfoCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"writeTime","type":"uint256"}],"name":"Write","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"},{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"updateTime","type":"uint256"}],"name":"Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"}],"name":"Remove","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'0xe76db8bef5f77313bc21047b22c054de41575566' :
			
			// 개발 모드
			// Kovan
			'0x53aa04abc951eeb0c82af5a90b0405179a2f8d05'
		};
	}
});