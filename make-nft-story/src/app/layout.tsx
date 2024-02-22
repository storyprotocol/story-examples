import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header, MainBody } from "@/components/Layouts";
import { ChakraClientProvider } from "@/providers/ChakraClientProvider";
import { Web3Provider } from "@/providers/Web3Provider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" }); // `variable` used by ChakraClientProvider

export const metadata: Metadata = {
  title: "Make NFT Story",
  description: "Make NFT Story",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body className={inter.className}>
          <ChakraClientProvider>
            <Header />
            <MainBody>{children}</MainBody>
          </ChakraClientProvider>
        </body>
      </Web3Provider>
    </html>
  );
}
