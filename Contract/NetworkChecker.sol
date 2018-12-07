pragma solidity ^0.5.1;

// 숫자 계산 시 오버플로우 문제를 방지하기 위한 라이브러리
contract NetworkChecker {
	
	address constant private MAINNET_MILESTONE_ADDRESS = 0x80c53F6b4920355659885304bE52b338ef4d56A8;
	address constant private ROPSTEN_MILESTONE_ADDRESS = 0x80cF3dAF64cb4284214913ed5F6eb33Acfb9b9F6;
	address constant private RINKEBY_MILESTONE_ADDRESS = 0xe9e046192a2FF2c2E4D1FE6AE6579279D50a83D3;
	address constant private KOVAN_MILESTONE_ADDRESS = 0x52f9d987ABE3f12408e15E25389b17289289B50d;
	
	enum Network {
		Mainnet,
		Ropsten,
		Rinkeby,
		Kovan,
		Unknown
	}
	
	Network public network;
	
	// 주어진 주소가 스마트 계약인지 확인합니다.
	function checkIsSmartContract(address addr) private view returns (bool) {
		uint32 size;
		assembly { size := extcodesize(addr) }
		return size > 0;
	}
	
	constructor() public {
		
		// Main 네트워크인지 확인합니다.
		if (checkIsSmartContract(MAINNET_MILESTONE_ADDRESS) == true) {
			(bool success, ) = MAINNET_MILESTONE_ADDRESS.call(abi.encodeWithSignature("helloMainnet()"));
			if (success == true) {
				network = Network.Mainnet;
				return;
			}
		}
		
		// Ropsten 네트워크인지 확인합니다.
		if (checkIsSmartContract(ROPSTEN_MILESTONE_ADDRESS) == true) {
			(bool success, ) = ROPSTEN_MILESTONE_ADDRESS.call(abi.encodeWithSignature("helloRopsten()"));
			if (success == true) {
				network = Network.Ropsten;
				return;
			}
		}
		
		// Rinkeby 네트워크인지 확인합니다.
		if (checkIsSmartContract(RINKEBY_MILESTONE_ADDRESS) == true) {
			(bool success, ) = RINKEBY_MILESTONE_ADDRESS.call(abi.encodeWithSignature("helloRinkeby()"));
			if (success == true) {
				network = Network.Rinkeby;
				return;
			}
		}
		
		// Kovan 네트워크인지 확인합니다.
		else if (checkIsSmartContract(KOVAN_MILESTONE_ADDRESS) == true) {
			(bool success, ) = KOVAN_MILESTONE_ADDRESS.call(abi.encodeWithSignature("helloKovan()"));
			if (success == true) {
				network = Network.Kovan;
				return;
			}
		}
		
		// 알 수 없는 네트워크
		network = Network.Unknown;
	}
}