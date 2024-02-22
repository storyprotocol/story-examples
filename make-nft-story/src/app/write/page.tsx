"use client";

import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { useReadContract } from "wagmi";

import {
  mockERC721ABI,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  MOCK_NFT_ADDRESS,
  EXPECTED_EDITED_DATA_NUM,
} from "@/constants";
import {
  b64ToBlob,
  getImageURLFromMetadata,
  imageUrlToBase64,
  combineCanvasDrawing,
  editImageDalle,
} from "@/utils";

export default function Home() {
  const saveableCanvas = useRef<CanvasDraw | null>(null);
  const [prompt, setPrompt] = useState<string>();

  const [imageBase64, setImageBase64] = useState<string>();
  const [editedDataURLs, setEditedDataURLs] = useState<string[]>([]);
  const [tokenId, setTokenId] = useState<string>();
  const [isDalleEditing, setIsDalleEditing] = useState(false);

  const { data: mintedTokenUriMetadata } = useReadContract({
    abi: mockERC721ABI,
    address: MOCK_NFT_ADDRESS,
    functionName: "tokenURI",
    args: [tokenId],
  });

  const mintedTokenImageURL = useMemo(
    () =>
      tokenId && !!mintedTokenUriMetadata
        ? getImageURLFromMetadata(mintedTokenUriMetadata as string)
        : undefined,
    [tokenId, mintedTokenUriMetadata]
  );

  const handleCreateStory = useCallback(async () => {
    if (isDalleEditing || !saveableCanvas.current || !imageBase64) return;
    if (!prompt || prompt.trim() === "") return;
    setIsDalleEditing(true);

    const { blob: maskBlob } = combineCanvasDrawing(saveableCanvas.current);
    const imageBlob = await b64ToBlob(imageBase64, IMAGE_WIDTH, IMAGE_HEIGHT);

    try {
      const editedImageBase64s = await editImageDalle(
        imageBlob,
        maskBlob,
        prompt,
        EXPECTED_EDITED_DATA_NUM
      );

      if (editedImageBase64s) {
        setEditedDataURLs(
          editedImageBase64s.map((b64) => `data:image/png;base64,${b64}`)
        );
      }
    } catch (error) {
      setEditedDataURLs([]);
      console.error(error);
    } finally {
      setIsDalleEditing(false);
    }
  }, [imageBase64, prompt, isDalleEditing]);

  // Fetch image and convert to base64
  useEffect(() => {
    if (!mintedTokenImageURL || imageBase64) return;
    const fetchImage = async () => {
      try {
        setImageBase64(await imageUrlToBase64(mintedTokenImageURL));
      } catch (error) {
        setImageBase64(undefined);
        console.error(error);
      }
    };
    fetchImage();
  }, [imageBase64, mintedTokenImageURL]);

  return (
    <Stack direction="column" spacing={4} alignItems="center">
      <Heading>Write your NFT story</Heading>
      {tokenId && mintedTokenImageURL && (
        <Text>
          Draw a mask on the image. Then, write a description of how you want to
          edit the masked region.
          <br />
          Write your NFT story!
        </Text>
      )}
      <section>
        {tokenId && mintedTokenImageURL ? (
          <>
            <Box className="border-4 border-teal-500 rounded-sm overflow-hidden">
              <CanvasDraw
                ref={(canvasDraw: CanvasDraw) =>
                  (saveableCanvas.current = canvasDraw)
                }
                brushColor="rgba(255,255,255,1)"
                imgSrc={mintedTokenImageURL}
                hideGrid
                canvasWidth={IMAGE_WIDTH}
                canvasHeight={IMAGE_HEIGHT}
              />
            </Box>
            <ButtonGroup mt={5} spacing={2}>
              <Button
                colorScheme="red"
                onClick={() => {
                  if (!saveableCanvas.current) return;
                  saveableCanvas.current.clear();
                }}
              >
                Clear Mask
              </Button>
              <Button
                onClick={() => {
                  if (!saveableCanvas.current) return;
                  saveableCanvas.current.undo();
                }}
              >
                Undo
              </Button>
            </ButtonGroup>
          </>
        ) : (
          <>
            <Text>Load the IP Asset that you want to make a story on!</Text>
            <Input
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Token ID"
              size="md"
              w="sm"
              mt={4}
            />
          </>
        )}
      </section>
      <section className="mt-4">
        {tokenId && mintedTokenImageURL && (
          <Stack direction="column" spacing={4} alignItems="center">
            <Box>
              <Text>
                Describe the new image! Your description will be used to
                maintain the original image and edit the masked region.
              </Text>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="p-2 border-2 border-gray-300"
                placeholder="Write your NFT story..."
                size="md"
                mt={4}
              />
            </Box>
            <Button
              colorScheme="teal"
              onClick={handleCreateStory}
              isDisabled={isDalleEditing}
            >
              {isDalleEditing ? "Creating..." : "Create a story"}
            </Button>
            {!isDalleEditing &&
              editedDataURLs.length === EXPECTED_EDITED_DATA_NUM && (
                <Tabs variant="soft-rounded" colorScheme="teal">
                  <TabList>
                    <Tab>Opt. 1</Tab>
                    <Tab>Opt. 2</Tab>
                    <Tab>Opt. 3</Tab>
                  </TabList>
                  <TabPanels>
                    {editedDataURLs.map((editedDataURL, index) => (
                      <TabPanel key={index}>
                        <NextImage
                          src={editedDataURL}
                          alt={`Edited Image ${index + 1}`}
                          width={IMAGE_WIDTH}
                          height={IMAGE_HEIGHT}
                        />
                      </TabPanel>
                    ))}
                  </TabPanels>
                </Tabs>
              )}
          </Stack>
        )}
      </section>
    </Stack>
  );
}
