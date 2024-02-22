"use client";

import { Button, Heading, Input, Stack, Text } from "@chakra-ui/react";
import {
  useReadIpAssetRegistryIpId,
  useMintLicense,
} from "@story-protocol/react";
import Image from "next/image";
import NextLink from "next/link";
import { useCallback, useMemo, useState } from "react";
import { Hex } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";

import { TransactionHash } from "@/components/TransactionHash";
import {
  mockERC721ABI,
  LICENSE_REGISTRY_ADDRESS,
  MOCK_NFT_ADDRESS,
} from "@/constants";
import { encodeInitParamsToHex, getImageURLFromMetadata } from "@/utils";
import { ViewNFT } from "@/components/ViewNFT";

const policyId = BigInt(1);

export default function LicensePage() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { writeContractAsync, isPending } = useMintLicense();

  const [tokenId, setTokenId] = useState<string>();
  const [licenseTokenId, setLicenseTokenId] = useState<string | undefined>();
  const [mintAmount, setMintAmount] = useState<bigint | undefined>();
  const [mintTxHash, setMintTxHash] = useState<Hex | undefined>();
  const [isMintingLicense, setIsMintingLicense] = useState(false);

  const { data: licensorIpId } = useReadIpAssetRegistryIpId({
    args: [BigInt(chainId), MOCK_NFT_ADDRESS, BigInt(tokenId ?? 0)],
  });

  const { data: tokenUriMetadata } = useReadContract({
    abi: mockERC721ABI,
    address: MOCK_NFT_ADDRESS,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const tokenImageURL = useMemo(
    () =>
      tokenId && !!tokenUriMetadata
        ? getImageURLFromMetadata(tokenUriMetadata as string)
        : undefined,
    [tokenId, tokenUriMetadata]
  );

  const mintTxReceipt = useWaitForTransactionReceipt({
    hash: mintTxHash,
  });

  const handleMintLicense = useCallback(async () => {
    if (!address || !licensorIpId || !mintAmount || isMintingLicense) return;
    setIsMintingLicense(true);

    // since we're minting from root IP account, royalty context must be empty
    const emptyRoyaltyContext = encodeInitParamsToHex({
      targetAncestors: [],
      targetRoyaltyAmount: [],
      parentAncestors1: [],
      parentAncestors2: [],
      parentAncestorsRoyalties1: [],
      parentAncestorsRoyalties2: [],
    });

    try {
      const mintTxHash = await writeContractAsync({
        functionName: "mintLicense",
        args: [
          policyId,
          licensorIpId,
          mintAmount,
          address,
          emptyRoyaltyContext,
        ],
      });
      setMintTxHash(mintTxHash);
    } catch (e) {
      console.error(e);
      setIsMintingLicense(false);
    }
  }, [mintAmount, address, writeContractAsync, licensorIpId, isMintingLicense]);

  // TODO: Parse the minted license tokenId from the mint transaction receipt
  // useEffect(() => {
  //   if (!mintTxReceipt.isFetchedAfterMount) return; // skip any previous fetches (cached)
  //   if (!mintTxReceipt.data) return;

  //   for (const log of mintTxReceipt.data.logs) {
  //     const topics = decodeEventLog({
  //       abi: licensingModuleABI,
  //       ...log,
  //     });

  //     if (topics.eventName === "TransferSingle") {
  //       const licenseTokenId = String((topics.args as { id: bigint }).id);
  //       setLicenseTokenId(licenseTokenId);
  //       setIsMintingLicense(false);
  //     }
  //   }
  // }, [mintTxReceipt]);

  return (
    <Stack direction="column" spacing={4} alignItems="center">
      <Heading>Get License from IP</Heading>
      <Text>Acquire a license from IP (licensor) to write your NFT story!</Text>
      <Input
        value={tokenId ? String(tokenId) : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const val = Number(e.target.value);
          setTokenId(String(val >= 0 ? val : 0));
        }}
        placeholder="Licensor Token ID"
        size="md"
        w="sm"
      />
      <Input
        value={mintAmount ? String(mintAmount) : undefined}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const val = Number(e.target.value);
          setMintAmount(BigInt(val >= 0 ? val : 0));
        }}
        placeholder="Mint Amount"
        size="md"
        w="sm"
      />
      <Button
        colorScheme="orange"
        variant="solid"
        onClick={() => handleMintLicense()}
        w="sm"
        isDisabled={isPending || isMintingLicense}
      >
        {isPending
          ? "Pending..."
          : isMintingLicense
          ? "Getting License..."
          : "Get License NFT"}
      </Button>
      <section>
        <TransactionHash txHash={mintTxHash} />
        <ViewNFT tokenId={licenseTokenId} />
        {tokenId && licensorIpId && tokenImageURL && (
          <Stack direction="column" spacing={3} mt={6} alignItems="center">
            <Heading>IP image</Heading>
            <Text>
              <b>Collection</b>: {MOCK_NFT_ADDRESS}
            </Text>
            <Text>
              <b>Token ID</b>: {tokenId}
            </Text>
            <Text>
              <b>Licensor IP ID</b>: {licensorIpId}
            </Text>
            <Text>
              <b>IP Image</b>: {tokenImageURL}
            </Text>
            <Image
              src={tokenImageURL as string}
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
