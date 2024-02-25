// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import { Test } from "forge-std/Test.sol";

import { RoyaltyVault } from "../contracts/RoyaltyVault.sol";

contract RoyaltyVaultTest is Test {
    RoyaltyVault public royaltyVault;

    function setUp() public {
        royaltyVault = new RoyaltyVault(address(0xda483fd6e6ecA1C2D913802F9a6B57a83b73029f), address(0x1), address(0x2));
    }
}
