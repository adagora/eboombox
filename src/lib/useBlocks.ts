"use client";

import { createContext, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { TRANSACTIONS_PER_TRACK } from "./blockUtils";
import { useGetBlockbyHash, useGetLatestBlock } from "../services/Block";
import { BlockSummary } from "../services/@types/block";

export const BlocksContext = createContext<
  Partial<ReturnType<typeof useBlocks>>
>({});

export default function useBlocks(initialBlocks?: string) {
  const [blockId, setBlockId] = useState<string | undefined>(initialBlocks);
  const [startTxn, setStartTxn] = useState<number>(0);
  const [blocks, setBlocks] = useState<BlockSummary[]>([]);
  const [blockWithTxns, setBlockWithTxns] = useState<BlockSummary | null>(null);

  const {
    data: latestBlockData,
    isLoading: isLoadinglatestBlockData,
    error: errorlatestBlockData
  } = useGetLatestBlock();

  const {
    data: currentBlockData,
    isLoading: isLoadingcurrentBlockData,
    error: errorcurrentBlockData
  } = useGetBlockbyHash(blockId || "");

  useMemo(() => {
    if (latestBlockData) {
      setBlocks((prevBlocks) => {
        if (
          prevBlocks.some(
            (block) => block.data.hash === latestBlockData.data.hash
          )
        ) {
          return prevBlocks;
        }

        const isNewBlockDifferent =
          prevBlocks.length === 0 ||
          latestBlockData.data.hash !==
            prevBlocks[prevBlocks.length - 1].data.hash;

        if (isNewBlockDifferent) {
          return [...prevBlocks, latestBlockData];
        } else {
          return prevBlocks;
        }
      });
    }
  }, [latestBlockData]);

  const currentBlock = useMemo(() => {
    return blockId ? blocks.find((block) => block.data.hash === blockId) : null;
  }, [blocks, blockId]);

  useMemo(() => {
    setBlockWithTxns(
      currentBlock && currentBlockData
        ? { ...currentBlock, ...currentBlockData }
        : null
    );
  }, [currentBlock, currentBlockData]);

  function handleToastClick(lastBlockInArray: BlockSummary) {
    setBlockWithTxns(lastBlockInArray);
  }

  useMemo(() => {
    if (!blocks.length) return;
    if (!blockId) setBlockId(blocks[0].data.hash || blocks[1].data.hash);
    else {
      toast.dark("New block just came in!", {
        toastId: blocks.length,
        onClick: () => {
          const latestBlock = blocks[blocks.length - 1];
          handleToastClick(latestBlock);
          toast.dismiss();
        }
      });
    }
  }, [blocks]);

  function nextTrack() {
    if (!blockWithTxns) return;
    setStartTxn((prev) => {
      const nextStartTxn = prev + TRANSACTIONS_PER_TRACK;
      if (nextStartTxn >= blockWithTxns.data.tx_hashes.length) {
        const currentBlockIndex = blocks.findIndex(
          (block) => block.data.hash === blockId
        );
        if (currentBlockIndex < blocks.length - 1) {
          setBlockId(blocks[currentBlockIndex + 1].data.hash);
          return 0;
        } else {
          setBlockId(undefined);
          return 0;
        }
      } else {
        return nextStartTxn;
      }
    });
  }

  function previousTrack() {
    if (!blockWithTxns) return;
    setStartTxn((prev) => {
      const nextStartTxn = prev - TRANSACTIONS_PER_TRACK;
      if (nextStartTxn < 0) {
        const currentBlockIndex = blocks.findIndex(
          (block) => block.data.hash === blockId
        );
        if (currentBlockIndex > 0) {
          setBlockId(blocks[currentBlockIndex - 1].data.hash);
          return Math.max(
            0,
            blocks[currentBlockIndex - 1].data.tx_hashes.length -
              TRANSACTIONS_PER_TRACK
          );
        } else {
          return 0;
        }
      } else {
        return nextStartTxn;
      }
    });
  }

  return {
    blockWithTxns,
    startTxn,
    nextTrack,
    previousTrack,
    isLoading: isLoadinglatestBlockData || isLoadingcurrentBlockData,
    error: errorlatestBlockData || errorcurrentBlockData
  };
}
