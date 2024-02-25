// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Royalty Underlying Token
/// @notice Royal Underlying Token is 1:1 mapping of ERC20 to Royalty NFT (of 0xSplits LS1155) for ERC-4626 vault.
contract RoyaltyToken is ERC20 {
	/// @notice Associated royalty vault address
	address public ROYALTY_VAULT;

	modifier onlyRoyaltyVault() {
		require(msg.sender == ROYALTY_VAULT, "RoyaltyToken: only vault");
		_;
	}

	constructor(address royaltyVault) ERC20("Royalty Underlying Token", "RUT") {
		ROYALTY_VAULT = royaltyVault;
	}

	function mint(uint256 amount) public onlyRoyaltyVault {
		_mint(ROYALTY_VAULT, amount);
	}
}