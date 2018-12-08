EtherDuck.ArticleControllerContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":false,"inputs":[{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"write","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"articleId","type":"uint256"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"writer","type":"address"}],"name":"getArticleIdsByWriter","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"category","type":"string"}],"name":"getArticleIdsByCategory","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"articleId","type":"uint256"}],"name":"read","outputs":[{"name":"writer","type":"address"},{"name":"category","type":"string"},{"name":"title","type":"string"},{"name":"content","type":"string"},{"name":"writeTime","type":"uint256"},{"name":"lastUpdateTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"writeTime","type":"uint256"}],"name":"Write","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"},{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"category","type":"string"},{"indexed":false,"name":"title","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"updateTime","type":"uint256"}],"name":"Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"articleId","type":"uint256"}],"name":"Remove","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'' :
			
			// 개발 모드
			// Kovan
			'0xed80b30b8850ef17aa7b7f5244fb91922014b7fa'
		};
	}
});