pragma solidity ^0.4.11;

import "zeppelin-solidity/contracts/token/MintableToken.sol";

contract JCR is MintableToken {

  string public name = "Jincor Token";
  string public symbol = "JCR";
  uint256 public decimals = 18;

  function JCR(uint256 _amount) {
    owner = msg.sender;
    mint(msg.sender, _amount);
  }

}
