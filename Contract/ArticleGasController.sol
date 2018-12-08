pragma solidity ^0.5.1;

import "./NetworkChecker.sol";
import "./ArticleControllerInterface.sol";

contract ArticleGasController is NetworkChecker, ArticleControllerInterface {
	
	mapping(uint => uint) private articleIdToGas;
	
}