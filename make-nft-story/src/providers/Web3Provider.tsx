"use client";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import {
  WagmiProvider,
  createConfig,
  deserialize,
  http,
  serialize,
} from "wagmi";
import { sepolia } from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [sepolia],
    transports: {
      [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL!),
    },
    ssr: false,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID!,
    appName: "Make NFT Story",
    appDescription: "Make NFT Story!",
    appUrl: "https://example.com",
    appIcon: "https://example.com/logo.png",
  })
);

const queryClient = new QueryClient();

const persister = createSyncStoragePersister({
  serialize,
  storage: window?.localStorage,
  deserialize,
});

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister }}
      >
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
};
