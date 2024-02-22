"use client";

import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRegisterRootIp } from "@story-protocol/react";
import NextLink from "next/link";
import { useCallback, useState } from "react";
import { stringToHex } from "viem";

import { MOCK_NFT_ADDRESS } from "@/constants";

const policyId = BigInt(1);

const ipName = "My NFT Story Character"; // Optional name for your IP
const contentHash = stringToHex("foobar", { size: 32 }); // Optional content hash
const externalURL = "https://example.com"; // Optional external URL

export default function RegisterPage() {
  const { writeContractAsync, isPending } = useRegisterRootIp();

  const [tokenId, setTokenId] = useState<string>();
  const [isRegisteringIp, setIsRegisteringIp] = useState(false);
  const [registerIpTxHash, setRegisterIpTxHash] = useState<
    string | undefined
  >();

  const handleRegisterIp = useCallback(async () => {
    if (!tokenId || isRegisteringIp) return;
    setIsRegisteringIp(true);

    try {
      const registerIpTxHash = await writeContractAsync({
        functionName: "registerRootIp",
        args: [
          policyId,
          MOCK_NFT_ADDRESS,
          BigInt(tokenId),
          ipName,
          contentHash,
          externalURL,
        ],
      });
      setRegisterIpTxHash(registerIpTxHash);
    } catch (e) {
      console.error(e);
      setIsRegisteringIp(false);
    }
  }, [tokenId, isRegisteringIp, writeContractAsync]);

  return (
    <Stack
      direction="column"
      spacing={4}
      alignItems="center"
      textAlign="center"
    >
      <Heading>Register your NFT as an IP</Heading>
      <Text>
        Make sure your wallet owns the NFT token ID. If not, mint a new one in
        the Mint tab.
      </Text>
      <FormControl isDisabled={true} mt={4}>
        <FormLabel textAlign="center">NFT Address (Mock)</FormLabel>
        <Input value={MOCK_NFT_ADDRESS} size="md" w="sm" />
      </FormControl>
      <FormControl isDisabled={isPending || isRegisteringIp}>
        <FormLabel textAlign="center">Your NFT token ID</FormLabel>
        <Input
          value={tokenId ? String(tokenId) : undefined}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Number(e.target.value);
            setTokenId(String(val >= 0 ? val : 0));
          }}
          placeholder="Token ID"
          size="md"
          w="sm"
        />
      </FormControl>
      <Button
        colorScheme="purple"
        variant="solid"
        onClick={() => handleRegisterIp()}
        isDisabled={isPending || isRegisteringIp}
        w="sm"
      >
        {isPending
          ? "Pending..."
          : isRegisteringIp
          ? "Registering..."
          : "Register IP"}
      </Button>
      <section>
        {registerIpTxHash && (
          <Stack direction="column" spacing={2} mt={10} alignItems="center">
            <Text>Transaction hash: {registerIpTxHash}</Text>
            <NextLink
              href={`https://sepolia.etherscan.io/tx/${registerIpTxHash}`}
              passHref
              target="_blank"
            >
              <Button as="a" colorScheme="blue" variant="outline">
                View on Etherscan
              </Button>
            </NextLink>
          </Stack>
        )}
      </section>
    </Stack>
  );
}
