EtherDuck.CommentControllerContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":true,"inputs":[],"name":"getCommentCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"writer","type":"address"}],"name":"getCommentIdsByWriter","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"string"},{"name":"content","type":"string"}],"name":"write","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"commentId","type":"uint256"}],"name":"remove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"comments","outputs":[{"name":"writer","type":"address"},{"name":"target","type":"string"},{"name":"content","type":"string"},{"name":"writeTime","type":"uint256"},{"name":"lastUpdateTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"getCommentIdsByTarget","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"commentId","type":"uint256"}],"name":"read","outputs":[{"name":"writer","type":"address"},{"name":"target","type":"string"},{"name":"content","type":"string"},{"name":"writeTime","type":"uint256"},{"name":"lastUpdateTime","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"commentId","type":"uint256"},{"name":"content","type":"string"}],"name":"update","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"writer","type":"address"},{"indexed":true,"name":"target","type":"string"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"writeTime","type":"uint256"}],"name":"Write","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"commentId","type":"uint256"},{"indexed":true,"name":"writer","type":"address"},{"indexed":false,"name":"content","type":"string"},{"indexed":false,"name":"updateTime","type":"uint256"}],"name":"Update","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"commentId","type":"uint256"}],"name":"Remove","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'0xe76db8bef5f77313bc21047b22c054de41575566' :
			
			// 개발 모드
			// Kovan
			'0x72e5be6b5d073c76e9e7582021b641e5891543c3'
		};
	}
});