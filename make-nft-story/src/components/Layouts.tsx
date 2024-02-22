"use client";

import {
  AddIcon,
  ArrowForwardIcon,
  CopyIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Button, ButtonGroup, Container, Heading } from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import NextLink from "next/link";
import { Suspense } from "react";

export function Header() {
  return (
    <header className="w-100vw bg-gray-50 border-b">
      <div className="flex flex-col items-center p-8 gap-3 max-w-4xl mx-auto">
        <Heading as="h1" size="2xl" noOfLines={1}>
          Make NFT Story
        </Heading>
        <ConnectKitButton />
        <Navbar />
      </div>
    </header>
  );
}

export function MainBody({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Container maxW="container.md" centerContent mt={10} py={6}>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </Container>
  );
}

export function Navbar() {
  return (
    <nav>
      <ButtonGroup spacing={4}>
        <NextLink href="/mint" passHref legacyBehavior>
          <Button
            as="a"
            leftIcon={<AddIcon />}
            colorScheme="blue"
            variant="outline"
          >
            Mint NFT
          </Button>
        </NextLink>
        <NextLink href="/register" passHref legacyBehavior>
          <Button
            as="a"
            leftIcon={<EditIcon />}
            colorScheme="purple"
            variant="outline"
          >
            Register IP
          </Button>
        </NextLink>
        <NextLink href="/license" passHref legacyBehavior>
          <Button
            as="a"
            leftIcon={<CopyIcon />}
            colorScheme="orange"
            variant="outline"
          >
            Get License
          </Button>
        </NextLink>
        <NextLink href="/write" passHref legacyBehavior>
          <Button
            as="a"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="solid"
          >
            Write Story
          </Button>
        </NextLink>
      </ButtonGroup>
    </nav>
  );
}
