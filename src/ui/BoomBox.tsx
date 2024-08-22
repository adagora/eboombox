"use client";

import React, { useContext, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { colors } from "../utils/styles";
import { FaRegShareSquare, FaInfoCircle } from "react-icons/fa";
import MediaPlayer from "./MediaPlayer";
import { BlocksContext } from "../lib/useBlocks";
import cacheData from "memory-cache";

import { TRANSACTIONS_PER_TRACK } from "../lib/blockUtils";
import getBlocksMusic from "../lib/music";
import { toast } from "react-toastify";
import BlockInfoSideMenu from "./BlockInfoDropdown";
import { useGetStakePoolInformation } from "../services/Pools";
import { BlockSummary } from "../services/@types/block";

const getKey = (blockWithTxns: BlockSummary, startTxn: number) =>
    "stateRoot=" +
    blockWithTxns.data.hash +
    "&start=" +
    startTxn +
    "&end=" +
    startTxn +
    TRANSACTIONS_PER_TRACK,
  getBlob = (blockWithTxns: BlockSummary, startTxn: number) =>
    new Promise<Blob>((resolve) => {
      const key = getKey(blockWithTxns, startTxn);
      const blob = cacheData.get(key);
      if (blob) resolve(blob);
      else
        getBlocksMusic(
          blockWithTxns.data.hash,
          blockWithTxns.data.tx_hashes,
          startTxn,
          startTxn + TRANSACTIONS_PER_TRACK
          // undefined
        ).then(({ blob }: any) => {
          cacheData.put(key, blob);
          resolve(blob);
        });
    });

export const truncateHash = (hash: any) =>
  hash.slice(0, 5) + "..." + hash.slice(-5);

export default function BoomBox() {
  const {
    nextTrack,
    previousTrack,
    blockWithTxns,
    startTxn = 0,
    isLoading,
    error
  } = useContext(BlocksContext);

  const { data: stakePoolInformationData } = useGetStakePoolInformation(
    blockWithTxns?.data?.block_producer!
  );

  const [blob, setBlob] = useState<Blob>();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    if (!blockWithTxns) return;
    // Get current track
    getBlob(blockWithTxns, startTxn).then((blob) => setBlob(blob));
    // Get next track
    if (
      startTxn + TRANSACTIONS_PER_TRACK <
      blockWithTxns.data.tx_hashes.length - 1
    )
      getBlob(blockWithTxns, startTxn + TRANSACTIONS_PER_TRACK);
    // Get previous track
    if (startTxn >= TRANSACTIONS_PER_TRACK)
      getBlob(blockWithTxns, startTxn - TRANSACTIONS_PER_TRACK);
  }, [blockWithTxns, startTxn]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Card>
        <Background />
        <Heading>
          <div
            onClick={() => {
              if (!blockWithTxns) return;
              navigator.clipboard.writeText(
                process.env.NEXT_PUBLIC_SELF_URL +
                  "/" +
                  blockWithTxns.data.hash +
                  "?start=" +
                  startTxn
              );
              toast.dark("Copied to clipboard!");
            }}
            title="Copy link to track to clipboard"
          >
            <div>
              <div>
                {!isLoading ? (
                  stakePoolInformationData ? (
                    stakePoolInformationData.data.meta_json?.name
                  ) : (
                    blockWithTxns && truncateHash(blockWithTxns.data.hash)
                  )
                ) : (
                  <BlurredLoadingComponent />
                )}
              </div>
              <SmallerText>Transactions:</SmallerText>
              <SmallerText>
                {typeof startTxn === "number" ? startTxn : "..."} -{" "}
                {typeof startTxn === "number"
                  ? startTxn + TRANSACTIONS_PER_TRACK
                  : "..."}
              </SmallerText>
            </div>
            <StyledCopyButton />
          </div>
        </Heading>

        <MediaPlayer
          blob={blob as Blob}
          previousTrack={previousTrack}
          nextTrack={nextTrack}
          blockWithTxns={blockWithTxns as BlockSummary}
          startTxn={startTxn}
        />
        {blockWithTxns ? (
          <Link
            href={`https://cexplorer.io/block/${blockWithTxns.data.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/logo_dark.svg" width={40} height={40} />
          </Link>
        ) : null}

        <InfoButton onClick={() => setIsInfoOpen(!isInfoOpen)}>
          <FaInfoCircle color="black" />
        </InfoButton>
      </Card>
      <BlockInfoSideMenu
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        blockInfo={blockWithTxns?.data || null}
      />
    </>
  );
}

const linearGradient = `linear-gradient(
    45deg,
    ${colors.blue},
    ${colors.lightGreen},
    ${colors.lightBlue},
    ${colors.blue},
    ${colors.green}
  );`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: black;
  border-radius: 32px;
`;

const Card = styled.div`
  background: rgba(52, 49, 58, 0.6);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 0 2rem;
  z-index: 1;

  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    background: ${linearGradient};
    background-size: 400%;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    z-index: -2;
    animation: animate 50s linear infinite;
    filter: blur(20px);
    border-radius: 32px;
  }

  @keyframes animate {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 300% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`;

const SmallerText = styled.div`
  font-size: 16px;
  color: white;
`;

const Heading = styled.div`
  color: ${colors.blue};
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;

  > div {
    display: flex;
    margin-right: -56px;
    cursor: pointer;

    :hover,
    :hover ${SmallerText} {
      color: ${colors.orange};
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StyledCopyButton = styled(FaRegShareSquare)`
  color: currentColor;
  width: 40px;
  height: 40px;
  cursor: pointer;

  margin-left: 32px;
`;

const Link = styled.a`
  position: absolute;
  top: 40px;
  left: 40px;
`;

const InfoButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${colors.blue};
  border: none;
  color: white;
  padding: 4px 4px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: ${colors.orange};
  }
`;

const BlurredLoadingComponent = styled.div`
  filter: blur(5px);
  background-color: rgba(50, 50, 50, 0.5);
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
`;
