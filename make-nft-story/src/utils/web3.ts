import { Hex, encodeAbiParameters, parseAbiParameters } from "viem";

export interface InitParams {
  targetAncestors: Hex[];
  targetRoyaltyAmount: number[];
  parentAncestors1: Hex[];
  parentAncestors2: Hex[];
  parentAncestorsRoyalties1: number[];
  parentAncestorsRoyalties2: number[];
}

export function encodeInitParamsToHex(params: Readonly<InitParams>): Hex {
  const values = [
    params.targetAncestors,
    params.targetRoyaltyAmount,
    params.parentAncestors1,
    params.parentAncestors2,
    params.parentAncestorsRoyalties1,
    params.parentAncestorsRoyalties2,
  ] as [Hex[], number[], Hex[], Hex[], number[], number[]];

  const hex = encodeAbiParameters(
    parseAbiParameters(
      "address[], uint32[], address[], address[], uint32[], uint32[]"
    ),
    values
  );
  return hex;
}

export function getImageURLFromMetadata(metadata: string): string | undefined {
  try {
    console.log(metadata);
    const parsed = JSON.parse(metadata);
    return parsed.image;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
