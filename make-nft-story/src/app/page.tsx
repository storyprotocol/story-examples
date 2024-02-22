"use client";

// import { MintLicense } from "@/components/Actions/MintLicense";
// import { MintNft } from "@/components/Actions/MintNft";
// import { RegisterDerivativeIp } from "@/components/Actions/RegisterDerivativeIp";
// import { RegisterRootIp } from "@/components/Actions/RegisterRootIp";

export default function Home() {
  return (
    <div className="flex flex-col text-center text-white">
      <p>Modify the values in each components file to interact with the SDK.</p>
    </div>
  );
}

/* <TextAndButton
          description="1. Mint an NFT if you don't have one yet"
          ActionComponent={MintNft}
        />

        <TextAndButton
          description="2. Update the contract address and token ID in RegisterRootIp.tsx"
          ActionComponent={RegisterRootIp}
        />

        <TextAndButton
          description="4. Specify the policyId and recipient in MintLicense.tsx"
          ActionComponent={MintLicense}
        />

        <TextAndButton
          description="5. Mint a derivative NFT if you don't have one yet"
          ActionComponent={MintNft}
        />

        <TextAndButton
          description="5. Specify the licenseId and derivative NFT details in RegisterDerivativeIp.tsx"
          ActionComponent={RegisterDerivativeIp}
        /> */
