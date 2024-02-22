import OpenAI, { toFile } from "openai";

// TODO: Move to server, browser will expose the API key
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  dangerouslyAllowBrowser: true,
});

export async function editImageDalle(
  imageBlob: Blob,
  maskBlob: Blob,
  prompt: string,
  editNum: number
): Promise<Array<string> | undefined> {
  const imageStream = await toFile(imageBlob, "image.png", {
    type: "image/png",
  });
  const maskStream = await toFile(maskBlob, "mask.png", {
    type: "image/png",
  });

  const params: OpenAI.ImageEditParams = {
    image: imageStream,
    mask: maskStream,
    prompt: prompt,
    n: editNum,
    size: "512x512",
    response_format: "b64_json",
  };

  try {
    const response = await openai.images.edit(params);
    return response.data.map((data) => data.b64_json as string);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
