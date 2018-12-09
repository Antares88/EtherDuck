EtherDuck.LikeControllerContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":false,"inputs":[{"name":"target","type":"string"}],"name":"like","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"getLikeCountByTarget","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gasInfos","outputs":[{"name":"writer","type":"address"},{"name":"behavior","type":"string"},{"name":"gasUsed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"checkTargetVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"string"}],"name":"dislike","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"getDislikeCountByTarget","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGasInfoCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":true,"name":"target","type":"string"}],"name":"Like","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":true,"name":"target","type":"string"}],"name":"Dislike","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'0xffe37788bc285046c23d89e5d2e502c450024f00' :
			
			// 개발 모드
			// Kovan
			'0xb31ce314d43d63d80d9f9b78205f383888901e76'
		};
	}
});