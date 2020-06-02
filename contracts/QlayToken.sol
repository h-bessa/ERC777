pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC777/ERC777.sol";


/**
 * @title QlayToken
 * @dev Very simple ERC777 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` or `ERC777` functions.
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract QlayToken is ERC777 {

    /**
     * @dev Constructor that gives msg.sender all of existing tokens.
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        address[] memory defaultOperators
    )
        ERC777(name, symbol, defaultOperators)
        public
    {
        _mint(msg.sender, totalSupply, "", "");
    }
}