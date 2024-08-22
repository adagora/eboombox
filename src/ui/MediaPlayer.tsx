"use client";

import React, { useEffect, useTransition } from "react";
import { BsPauseCircleFill, BsPlayCircleFill } from "react-icons/bs";
import { CgPlayTrackNextO, CgPlayTrackPrevO } from "react-icons/cg";
import styled from "@emotion/styled";
import { TbFileDownload } from "react-icons/tb";
import { colors } from "../utils/styles";
import useMediaPlayer from "../utils/useMediaPlayer";
import { TRANSACTIONS_PER_TRACK } from "../lib/blockUtils";
import Crunker from "crunker";
import FileUploadComponent from "./FileUploadComponent";
import { toast } from "react-toastify";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";

import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { BlockSummary } from "../services/@types/block";
import { handleMint } from "../actions/action";
import { useFilterFiles } from "../services/FileSystem";
import { useShareFile } from "../services/FileShare";
import Tooltip from "./Tooltip";

let fileName: string;

const downloadTrack =
  (blob: Blob, blockWithTxns: BlockSummary | null, startTxn: number) => () => {
    const crunker = new Crunker();
    const blockHash = blockWithTxns!.data.hash;
    const blockSectionStart = startTxn;
    const blockSectionEnd = blockSectionStart + TRANSACTIONS_PER_TRACK;
    fileName = `ada-block-hash-${blockHash}-txns-${blockSectionStart}-to-${blockSectionEnd}`;
    crunker.download(blob, fileName);
  };

export default function MediaPlayer({
  blob,
  previousTrack,
  nextTrack,
  blockWithTxns,
  startTxn
}: {
  blob: Blob;
  previousTrack: (() => void) | undefined;
  nextTrack: (() => void) | undefined;
  blockWithTxns: BlockSummary;
  startTxn: number;
}) {
  const [isMintPending, startMintTransition] = useTransition();
  const { data: filteredfileByfileNameData } = useFilterFiles(
    fileName,
    "public",
    "index",
    !!fileName && isMintPending
  );

  const { data: shareFileData } = useShareFile(
    filteredfileByfileNameData?.data?.files[0]?._id!
  );

  const {
    currentTime = null,
    duration = null,
    isPlaying,
    togglePlay,
    trackEnded,
    base64Image
  } = useMediaPlayer(blob);

  const network =
    process.env.NEXT_PUBLIC_NODE_ENV === "development"
      ? NetworkType.TESTNET
      : NetworkType.MAINNET;
  const { isConnected, usedAddresses } = useCardano({
    limitNetwork: network
  });

  return (
    <MediaPlayerContainer id="media-player">
      <CanvasContainer id="canvas-container">
        <Canvas />
      </CanvasContainer>
      <Duration>
        <span>{currentTime || "--:--"}</span>
        <span>{duration || "--:--"}</span>
      </Duration>
      <Controls>
        <Tooltip content="Miniting NFT, to mint you should: 1. Download file on local machine, 2. [optional] upload downloaded file to iagon cloud">
          <StyledMintButton
            onClick={() => {
              let mint: { message: string };
              startMintTransition(async () => {
                mint = await handleMint(
                  isConnected,
                  blockWithTxns,
                  fileName,
                  startTxn,
                  base64Image,
                  usedAddresses[0],
                  shareFileData?.data.baseShareableLink!
                );

                toast.dark(mint.message, {
                  position: "top-left"
                });

                fileName = "";
              });
            }}
            aria-disabled={isMintPending}
          >
            {isMintPending ? "loading..." : "mint"}
          </StyledMintButton>
        </Tooltip>

        {previousTrack ? <NextButton onClick={previousTrack} /> : <div />}
        {isPlaying || trackEnded ? (
          <PauseButton onClick={togglePlay} />
        ) : (
          <PlayButton onClick={togglePlay} />
        )}
        {nextTrack ? <PreviousButton onClick={nextTrack} /> : <div />}
        <Tooltip content="download">
          <StyledDownloadButton
            onClick={downloadTrack(blob, blockWithTxns, startTxn)}
          />
        </Tooltip>
        <Tooltip content="upload to iagon">
          <FileUploadComponent />
        </Tooltip>
      </Controls>
    </MediaPlayerContainer>
  );
}

const StyledDownloadButton = styled(TbFileDownload)`
  color: white;
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  :hover {
    color: ${colors.orange};
  }
`;

const StyledMintButton = styled.span`
  color: #ff875b;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  :hover {
    color: ${colors.orange};
  }

  opacity: 0.5;
`;

const MediaPlayerContainer = styled.div`
  width: 100%;
  padding: 1.5rem 0;
  position: relative;
`;

const CanvasContainer = styled.div`
  height: 130px;
  padding: 1rem 0;
  box-sizing: border-box;

  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none;
  }
`;

const Canvas = styled.canvas`
  height: 100%;
`;

const Duration = styled.div`
  display: flex;
  color: ${colors.blue};
  align-items: center;
  justify-content: space-between;
  font-size: 20px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 1rem;
  gap: 1rem;
`;

const playPauseButtonStyles = `
  color: white;

  cursor: pointer;
  user-select: none;

  width: 50px;
  height: 50px;

  :hover{
    color: ${colors.orange};
  }
`;

const PlayButton = styled(BsPlayCircleFill)`
  ${playPauseButtonStyles}
`;
const PauseButton = styled(BsPauseCircleFill)`
  ${playPauseButtonStyles}
`;
const NextButton = styled(CgPlayTrackPrevO)`
  ${playPauseButtonStyles}
`;
const PreviousButton = styled(CgPlayTrackNextO)`
  ${playPauseButtonStyles}
`;
