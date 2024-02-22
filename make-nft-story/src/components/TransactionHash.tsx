import { Button, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Hex } from "viem";

export type TransactionHash = {
  txHash?: Hex;
};

export function TransactionHash(props: TransactionHash) {
  if (!props.txHash) return <></>;

  return (
    <Stack direction="column" spacing={2} mt={10} alignItems="center" textAlign="center">
      <Text>Transaction hash</Text>
			<Text>{props.txHash}</Text>
      <NextLink
        href={`https://sepolia.etherscan.io/tx/${props.txHash}`}
        passHref
        target="_blank"
      >
        <Button as="a" colorScheme="blue" variant="outline">
          View on Etherscan
        </Button>
      </NextLink>
    </Stack>
  );
}
