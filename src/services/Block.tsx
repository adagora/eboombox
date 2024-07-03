import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API_URL_MAESTRO, API_KEY_MAESTRO } from "../lib/api";
import { BlockSummary } from "./@types/block";

export function useGetBlockbyHash(blockHash: string) {
  return useQuery<BlockSummary, Error>({
    queryKey: ["block", blockHash],
    queryFn: async () => {
      if (!blockHash) throw new Error("No block ID");

      const response = await fetch(`${API_URL_MAESTRO}/blocks/${blockHash}`, {
        headers: {
          Accept: "application/json",
          "api-key": API_KEY_MAESTRO!
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    enabled: !!blockHash
  });
}

export function useGetLatestBlock(): UseQueryResult<BlockSummary, Error> {
  return useQuery<BlockSummary, Error>({
    queryKey: ["latestBlock"],
    queryFn: async () => {
      const response = await fetch(`${API_URL_MAESTRO}/blocks/latest`, {
        headers: {
          Accept: "application/json",
          "api-key": API_KEY_MAESTRO!
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    refetchInterval: 20000
  });
}
