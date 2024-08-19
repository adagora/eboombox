"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styled from "@emotion/styled";
import { IoArrowBack } from "react-icons/io5";
import { useGetBlockbyHash } from "@/src/services/Block";
import { BlocksContext } from "@/src/lib/useBlocks";
import { colors } from "@/src/utils/styles";
const BoomBox = dynamic(() => import("../../ui/BoomBox"), { ssr: false });

export default function Page({ params }: { params: { blockHash: string } }) {
  const searchParams = useSearchParams();
  const startParam = searchParams?.get("start") as string;

  const {
    data: currentBlockData,
    isLoading: isLoadingcurrentBlockData,
    error: errorcurrentBlockData
  } = useGetBlockbyHash(params.blockHash);

  return (
    <Suspense
      fallback={
        errorcurrentBlockData ? (
          <div>Error: {errorcurrentBlockData.message}</div>
        ) : (
          "something happened"
        )
      }
    >
      <BlocksContext.Provider
        value={{
          blockWithTxns: currentBlockData,
          startTxn: parseInt(startParam) || 0,
          isLoading: isLoadingcurrentBlockData,
          error: errorcurrentBlockData
        }}
      >
        <>
          <BoomBox />
          <Link href="/">
            <div>
              <BackButton />
            </div>
          </Link>
        </>
      </BlocksContext.Provider>
    </Suspense>
  );
}

const BackButton = styled(IoArrowBack)`
  position: fixed;
  top: 40px;
  left: 40px;
  height: 40px;
  width: 40px;
  color: white;
  cursor: pointer;

  :hover {
    color: ${colors.lightBlue};
  }
`;
