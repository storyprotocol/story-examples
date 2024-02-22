import ImageJS from "image-js";
import CanvasDraw from "react-canvas-draw";

export interface DrawImageCanvasParams {
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  offsetX?: number;
  offsetY?: number;
}

export function combineCanvasDrawing(canvasDraw: CanvasDraw) {
  const width = canvasDraw.props.canvasWidth as number;
  const height = canvasDraw.props.canvasHeight as number;
  // @ts-ignore
  const bgImg = canvasDraw.canvasContainer.children[0] as CanvasImageSource;
  // @ts-ignore
  const drawing = canvasDraw.canvasContainer.children[1] as CanvasImageSource;

  const canvas = document.createElement("canvas");
  if (!canvas) throw new Error("Canvas not found");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context not found");

  // composite now
  ctx.drawImage(bgImg, 0, 0);
  ctx.globalAlpha = 1.0;
  // NOTE: before drawing the mask on the background image, set globalCompositeOperation to "destination-out"
  // which means the drawn area of mask will "erase" that area background image.
  // OpenAI requires the mask input to erase the area to edit on the original image.
  ctx.globalCompositeOperation = "destination-out";
  ctx.drawImage(drawing, 0, 0);

  const dataUri = canvas.toDataURL("image/png", 1.0);
  const base64 = dataUri.split(",")[1];
  const mimeType = dataUri.split(";")[0].slice(5);

  const bytes = atob(base64);
  const buf = new ArrayBuffer(bytes.length);
  const arr = new Uint8Array(buf);

  for (let i = 0; i < bytes.length; i++) {
    arr[i] = bytes.charCodeAt(i);
  }

  const blob = new Blob([arr], { type: mimeType });
  return { blob: blob, dataUri: dataUri };
}

export async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(this.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      reject(e as Error);
    }
  });
}

export async function b64ToBlob(
  b64Data: string,
  expectedWidth: number,
  expectedHeight: number
): Promise<Blob> {
  const img = await ImageJS.load(b64Data);
  if (img.width != expectedWidth || img.height != expectedHeight) {
    throw new Error("Image dimensions do not match expected dimensions");
  }

  const rgbaImg = img.rgba8(); // RGBA blob (for OpenAI API)
  return await rgbaImg.toBlob("image/png");
}