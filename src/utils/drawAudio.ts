"use client";

import { colors } from "./styles";

if (typeof window !== "undefined") {
  // @ts-ignore:next-line
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
}

const audioContext = typeof window !== "undefined" ? new AudioContext() : null;

const canvasToBase64 = (canvas: HTMLCanvasElement): string => {
  return canvas.toDataURL("image/png").split(",")[1];
};

const drawAudio = (blob: Blob, setBase64Image: (base64: string) => void) => {
  if (!audioContext) {
    console.error("AudioContext is not available");
    return;
  }

  blob
    .arrayBuffer()
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((audioBuffer) => {
      const normalizedData = normalizeData(filterData(audioBuffer));
      const canvas = draw(normalizedData);
      try {
        const base64 = canvasToBase64(canvas);
        setBase64Image(base64);
      } catch (error) {
        console.error("Error converting canvas to BASE64:", error);
      }
    })
    .catch((error) => {
      console.error("Error processing audio data:", error);
    });
};

const filterData = (audioBuffer: AudioBuffer): number[] => {
  const rawData = audioBuffer.getChannelData(0);
  const samples = Math.floor(audioBuffer.duration * 2);
  const blockSize = Math.floor(rawData.length / samples);
  const filteredData: number[] = [];
  for (let i = 0; i < samples; i++) {
    let blockStart = blockSize * i;
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum = sum + Math.abs(rawData[blockStart + j]);
    }
    filteredData.push(sum / blockSize);
  }
  return filteredData;
};

const normalizeData = (filteredData: number[]): number[] => {
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};

const draw = (normalizedData: number[]) => {
  const canvas = document.querySelector("canvas") as HTMLCanvasElement;
  const dpr = window.devicePixelRatio || 1;
  const padding = 10;
  const width = 8;
  canvas.width = width * normalizedData.length;
  canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.scale(dpr, dpr);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(0, canvas.offsetHeight / 2 + padding);

  for (let i = 0; i < normalizedData.length; i++) {
    const x = width * i;
    let height = normalizedData[i] * canvas.offsetHeight - padding;
    if (height < 0) {
      height = 0;
    } else if (height > canvas.offsetHeight / 2) {
      height = canvas.offsetHeight / 2;
    }
    drawLineSegment(ctx, x, height, width, Boolean((i + 1) % 2));
  }
  return canvas;
};

const drawLineSegment = (
  ctx: CanvasRenderingContext2D,
  x: number,
  height: number,
  width: number,
  isEven: boolean
) => {
  ctx.lineWidth = 2;
  ctx.strokeStyle = colors.blue;
  ctx.beginPath();
  height = isEven ? height : -height;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, height);
  ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);

  ctx.stroke();
};

export default drawAudio;
