# Royalty Yield Vault

Story Protocol provides a royalty policy for the Royalty Module called "Royalty Policy LAP," which uses 0xSplits for royalty payments.

In Royalty Policy LAP, each IP Account has a unique Royalty NFT (RNFT) contract, which is an ERC-1155 token with token ID = 0. There are 1000 units of supply of RNFT per IP Account, each 10 unit of RNFT representing 1% of royalty received by the IP Account. The RNFT holders can claim proportionate amount of royalty payments received by the associated IP Account.


This example creates an ERC-20 that maps 1 ERC-1155 Royalty NFT to 1 ERC-20 token, and uses the token in ERC-4626 vault standard. It allows contract developers to accept Royalty NFT and continuously manage the royalty received from those royalty NFTs. Thus, devs can implement various DeFi strategies that utilize royalty payments, and RNFT owners can enjoy yield without taking any action.

## Installation
```
yarn
forge build
```