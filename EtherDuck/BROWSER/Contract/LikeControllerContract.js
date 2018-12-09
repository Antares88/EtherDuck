EtherDuck.LikeControllerContract = OBJECT({
	preset : () => {
		return Contract2Object;
	},
	params : () => {
		return {
			
			abi : [{"constant":false,"inputs":[{"name":"target","type":"string"}],"name":"like","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"getLikeCountByTarget","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"gasInfos","outputs":[{"name":"voter","type":"address"},{"name":"behavior","type":"string"},{"name":"gasUsed","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"checkTargetVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"target","type":"string"}],"name":"dislike","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"target","type":"string"}],"name":"getDislikeCountByTarget","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGasInfoCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":true,"name":"target","type":"string"}],"name":"Like","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"voter","type":"address"},{"indexed":true,"name":"target","type":"string"}],"name":"Dislike","type":"event"}],
			
			address : CONFIG.isTestnetMode !== true ?
			
			// 운영 모드
			'0xadc91307677014612fd91953722819b53312a142' :
			
			// 개발 모드
			// Kovan
			'0x62abb062ed4f5db693299e021c8d4bc50e0a853d'
		};
	}
});