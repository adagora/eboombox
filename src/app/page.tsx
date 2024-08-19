"use client";

import React from "react";
import dynamic from "next/dynamic";
import { CacheProvider } from "@emotion/react";
import { globalStyles } from "../utils/styles";
import createCache from "@emotion/cache";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient
} from "@tanstack/react-query";
import useBlocks, { BlocksContext } from "../lib/useBlocks";

const BoomBox = dynamic(() => import("../ui/BoomBox"), { ssr: false });

const cache = createCache({ key: "next" });

export default function Home() {
  const queryClient = new QueryClient();
  const blocks = useBlocks();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CacheProvider value={cache}>
        <BlocksContext.Provider value={blocks}>
          <BoomBox />
          {globalStyles}
        </BlocksContext.Provider>
      </CacheProvider>
    </HydrationBoundary>
  );
}
