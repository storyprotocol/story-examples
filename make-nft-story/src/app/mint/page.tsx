"use client";

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
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

import { TransactionHash } from "@/components/TransactionHash";
import {
  mockERC721ABI,
  MOCK_NFT_ADDRESS,
  LICENSE_REGISTRY_ADDRESS,
} from "@/constants";
import { getImageURLFromMetadata } from "@/utils";
import { ViewNFT } from "@/components/ViewNFT";

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
      <FormControl isDisabled={true}>
        <FormLabel textAlign="center">NFT Address (Mock)</FormLabel>
        <Input value={MOCK_NFT_ADDRESS} size="md" w="sm" />
      </FormControl>
      <FormControl isDisabled={isPending || isMinting}>
        <FormLabel textAlign="center">Custom Image URL</FormLabel>
        <Input
          value={nftUri}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNftUri(e.target.value)
          }
          placeholder="Leave empty for Steamboat Willie"
          size="md"
          w="lg"
        />
      </FormControl>
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
        <TransactionHash txHash={mintTxHash} />
        <ViewNFT tokenId={mintedTokenId} />
        {mintTxHash && mintedTokenImageURL && (
          <Stack direction="column" spacing={4} mt={6} alignItems="center">
            <Heading>Minted NFT Image</Heading>
            <ButtonGroup spacing={3}>
              <NextLink
                href={`https://testnets.opensea.io/assets/sepolia/${LICENSE_REGISTRY_ADDRESS}/${mintedTokenId}`}
                passHref
                target="_blank"
              >
                <Button as="a" colorScheme="blue" variant="outline">
                  View on OpenSea
                </Button>
              </NextLink>
              <NextLink
                href={mintedTokenImageURL as string}
                passHref
                target="_blank"
              >
                <Button as="a" colorScheme="blue" variant="outline">
                  View Externally
                </Button>
              </NextLink>
            </ButtonGroup>
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
