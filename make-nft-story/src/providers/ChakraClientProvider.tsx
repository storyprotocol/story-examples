"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const chakraTheme = extendTheme({
  fonts: {
    heading: "var(--font-inter)",
    body: "var(--font-inter)",
  },
});

// Chakra UI only works in client-side components, so mark this file as client-side only
export function ChakraClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
}
