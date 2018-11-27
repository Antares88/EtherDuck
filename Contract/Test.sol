pragma solidity ^0.4.25;

import "./NetworkChecker.sol";
import "./RMAArticleController.sol";

contract Test is NetworkChecker {
	
	function test() public pure returns (address) {
		//if (network == Network.Kovan) {
			RMAArticleController controller = RMAArticleController(0x72446703C3B06a448862Da7b260848Dc1A53B962);
			return controller.articleIdToWriter(0);
		//}
	}
}