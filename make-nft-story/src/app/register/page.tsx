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
import { useCallback, useState } from "react";
import { Hex, stringToHex } from "viem";

import { TransactionHash } from "@/components/TransactionHash";
import { MOCK_NFT_ADDRESS } from "@/constants";

const policyId = BigInt(1);

const ipName = "My NFT Story Character"; // Optional name for your IP
const contentHash = stringToHex("foobar", { size: 32 }); // Optional content hash
const externalURL = "https://example.com"; // Optional external URL

export default function RegisterPage() {
  const { writeContractAsync, isPending } = useRegisterRootIp();

  const [tokenId, setTokenId] = useState<string>();
  const [isRegisteringIp, setIsRegisteringIp] = useState(false);
  const [registerIpTxHash, setRegisterIpTxHash] = useState<Hex>();

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
      <Text fontWeight="bold">Make your IP programmable!</Text>
      <Text>
        Make sure your wallet owns the NFT token ID. If not, mint a new one in
        the Mint tab.
      </Text>
      <FormControl isDisabled={true} mt={4}>
        <FormLabel textAlign="center">NFT Address (Mock)</FormLabel>
        <Input value={MOCK_NFT_ADDRESS} size="md" w="lg" />
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
          w="lg"
        />
      </FormControl>
      <Button
        colorScheme="purple"
        variant="solid"
        onClick={() => handleRegisterIp()}
        isDisabled={isPending || isRegisteringIp}
        w="lg"
      >
        {isPending
          ? "Pending..."
          : isRegisteringIp
          ? "Registering..."
          : "Register IP"}
      </Button>
      <section>
        <TransactionHash txHash={registerIpTxHash} />
      </section>
    </Stack>
  );
}
