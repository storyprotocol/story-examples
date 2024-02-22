# Story Example: Write NFT Story

Write your own story using any NFT (IP) registered on Story Protocol. Programmable IPs!

1. Mint NFT with the default or your custom image.
2. Register your NFT as an IP on Story Protocol.
3. Acquire commercial or non-commercial licenses from any IPs on Story Protocol.
4. Edit an IP's image and register as a derivative using the license from (3)!

## Getting Started

First, copy `.env.example` to `.env.local` with your keys.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Caution

Currently, this example calls OpenAI's DALL-E 2 API directly from the browser using the OpenAI key in `.env.local`. **As such, the API calls will expose the API key to the public!** Please test in local and move the OpenAI calls to a relayer server to hide your OpenAI key.
