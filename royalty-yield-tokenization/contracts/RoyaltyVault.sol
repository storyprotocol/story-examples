// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import { IPool } from "@aave/core-v3/interfaces/IPool.sol";
import { IPoolAddressesProvider } from "@aave/core-v3/interfaces/IPoolAddressesProvider.sol";
import { Ownable, Ownable2Step } from "@openzeppelin/contracts/access/Ownable2Step.sol";
import { ERC20, IERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { IERC1155 } from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import { ERC4626 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

import { RoyaltyToken } from "./RoyaltyToken.sol";

/// @title Royalty Vault
/// @notice This contract is 4626 vault for Royalty Tokens
contract RoyaltyVault is ERC4626, Ownable2Step {
	error RoyaltyVault__AaveWithdrawalNotReady();

	/// @notice List of allowed tokens for vault strategies
	mapping(address => bool) public whitelistedTokens;

	/// @notice The associated 0xSplits LS1155 Royalty NFT contract
	IERC1155 public ROYALTY_NFT;

	/// @notice The associated ERC20 token for the vault that represents each ERC-1155 Royalty NFT.
	IERC20 public ROYALTY_TOKEN;

	/// @notice Aave pool address
	IPool public AAVE_POOL;

	/// @notice Last time Aave withdrawal was made
	uint256 public lastAaveWithdrawal;

	/// @notice Enforced internval between permissionless Aave withdrawals
	uint256 public aaveWithdrawalInterval;

	constructor(address royaltyNft, address aavePoolAddressProvider)
		ERC4626(_createRoyaltyToken())
		ERC20("Royalty Vault Token", "RVT")
		Ownable(msg.sender)
	{
		ROYALTY_NFT = IERC1155(royaltyNft);
		AAVE_POOL = IPool(IPoolAddressesProvider(aavePoolAddressProvider).getPool());
	}

	modifier onlyWhitelistedToken(address token) {
		require(whitelistedTokens[token], "RoyaltyVault: token not whitelisted");
		_;
	}

	modifier onlyAfterInterval(uint256 last, uint256 interval) {
		require(block.timestamp - last >= interval, "RoyaltyVault: withdrawal interval not reached");
		_;
	}

	function depositRNFT(uint256 amount) public {
		ROYALTY_NFT.safeTransferFrom(msg.sender, address(this), 0, amount, "");
		_mint(msg.sender, amount);
	}

	function withdrawRNFT(uint256 amount) public {
		require(balanceOf(msg.sender) >= amount, "RoyaltyVault: insufficient balance");
		_burn(msg.sender, amount);
		ROYALTY_NFT.safeTransferFrom(address(this), msg.sender, 0, amount, "");
	}

	/// @dev Create a new ERC20 token for the vault that represents each ERC-1155 Royalty NFT.
	function _createRoyaltyToken() internal returns (IERC20) {
		ROYALTY_TOKEN = new RoyaltyToken(address(this));
		return IERC20(ROYALTY_TOKEN);
	}

	//
	// Owner functions
	//

	function whitelistToken(address token, bool status) public onlyOwner {
		whitelistedTokens[token] = status;
	}

	function setAaveWithdrawalInterval(uint256 interval) public onlyOwner {
		// change so that the max interval is 7 days and the min interval is 1 day
		require(interval >= 1 days && interval <= 7 days, "RoyaltyVault: invalid interval");
		aaveWithdrawalInterval = interval;
	}

	//
	// Strategies
	// NOTE: permissionless calls
	//

	/// @notice Deposit token to Aave, which converts underlying tokens in this contract to aTokens.
	function aaveLend(address token, uint256 amount) public onlyWhitelistedToken(token) {
		AAVE_POOL.supply(token, amount, address(this), 0);
	}

	/// @notice Withdraw token from Aave, which converts aTokens in this contract back to underlying tokens with accrued
	/// interest.
	function aaveWithdraw(address token, uint256 amount)
		public
		onlyWhitelistedToken(token)
		onlyAfterInterval(lastAaveWithdrawal, aaveWithdrawalInterval)
	{
		lastAaveWithdrawal = block.timestamp;
		AAVE_POOL.withdraw(token, amount, address(this));
	}
}