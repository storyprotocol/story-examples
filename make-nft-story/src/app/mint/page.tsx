"use client";

import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { Hex, decodeEventLog } from "viem";

import { mockERC721ABI, MOCK_NFT_ADDRESS } from "@/constants";
import { getImageURLFromMetadata } from "@/utils";

export default function MintPage() {
  const { address } = useAccount();
  const { writeContractAsync, isPending } = useWriteContract();

  const [nftUri, setNftUri] = useState<string>();
  const [mintTxHash, setMintTxHash] = useState<Hex>();
  const [mintedTokenId, setMintedTokenId] = useState<string>();
  const [isMinting, setIsMinting] = useState(false);

  const { data: mintedTokenUriMetadata } = useReadContract({
    abi: mockERC721ABI,
    address: MOCK_NFT_ADDRESS,
    functionName: "tokenURI",
    args: [mintedTokenId],
  });

  const mintTxReceipt = useWaitForTransactionReceipt({
    hash: mintTxHash,
  });

  const mintedTokenImageURL = useMemo(
    () =>
      mintTxHash && !!mintedTokenUriMetadata
        ? getImageURLFromMetadata(mintedTokenUriMetadata as string)
        : undefined,
    [mintedTokenUriMetadata, mintTxHash]
  );

  const handleMintNft = useCallback(async () => {
    if (isMinting) return;
    setIsMinting(true);

    // If `nftUri` is empty, it will mint NFT with default uri in the contract. Otherwise, use the provided uri.
    const args = nftUri && nftUri.trim() ? [address, nftUri] : [address];
    try {
      const txHash = await writeContractAsync({
        abi: mockERC721ABI,
        address: MOCK_NFT_ADDRESS,
        functionName: "mint",
        args,
      });
      setMintTxHash(txHash);
    } catch (e) {
      console.error(e);
      setIsMinting(false);
    }
  }, [address, nftUri, writeContractAsync, isMinting]);

  // Parse the minted tokenId from the mint transaction receipt
  useEffect(() => {
    if (!mintTxReceipt.isFetchedAfterMount) return; // skip any previous fetches (cached)
    if (!mintTxReceipt.data) return;

    // parse log
    for (const log of mintTxReceipt.data.logs) {
      const topics = decodeEventLog({
        abi: mockERC721ABI,
        ...log,
      });

      if (topics.eventName === "Transfer") {
        const tokenId = String((topics.args as { tokenId: bigint }).tokenId);
        setMintedTokenId(tokenId);
        setIsMinting(false);
      }
    }
  }, [mintTxReceipt]);

  if (!address) return <div>Connect Wallet</div>;

  return (
    <Stack direction="column" spacing={4} alignItems="center">
      <Heading>Mint NFT</Heading>
      <Text>
        Mint an NFT with Steamboat Willie image or your custom image (URL)
      </Text>
      <Input
        value={nftUri}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNftUri(e.target.value)
        }
        placeholder="Custom Image URL"
        size="md"
        w="lg"
      />
      <Button
        colorScheme="blue"
        variant="solid"
        onClick={() => handleMintNft()}
        w="lg"
        isDisabled={isPending || isMinting}
      >
        {isPending
          ? "Pending..."
          : isMinting
          ? "Minting..."
          : "Mint a test NFT"}
      </Button>
      <section>
        {mintTxHash && (
          <Stack direction="column" spacing={2} mt={10} alignItems="center">
            <Text>Minting transaction hash: {mintTxHash}</Text>
            <NextLink
              href={`https://sepolia.etherscan.io/tx/${mintTxHash}`}
              passHref
              target="_blank"
            >
              <Button as="a" colorScheme="blue" variant="outline">
                View on Etherscan
              </Button>
            </NextLink>
          </Stack>
        )}
        {mintTxHash && mintedTokenId && (
          <Stack direction="column" spacing={2} mt={6} alignItems="center">
            <Text>Minted NFT tokenId: {mintedTokenId}</Text>
            <NextLink
              href={`https://testnets.opensea.io/assets/sepolia/${MOCK_NFT_ADDRESS}/${mintedTokenId}`}
              passHref
              target="_blank"
            >
              <Button as="a" colorScheme="blue" variant="outline">
                View on OpenSea
              </Button>
            </NextLink>
          </Stack>
        )}
        {mintTxHash && mintedTokenImageURL && (
          <Stack direction="column" spacing={4} mt={6} alignItems="center">
            <Heading>Minted NFT image</Heading>
            <NextLink
              href={mintedTokenImageURL as string}
              passHref
              target="_blank"
            >
              <Button as="a" colorScheme="blue" variant="outline">
                View Externally
              </Button>
            </NextLink>
            <Image
              src={mintedTokenImageURL as string}
              alt="Minted NFT"
              width={512}
              height={512}
            />
          </Stack>
        )}
      </section>
    </Stack>
  );
}
