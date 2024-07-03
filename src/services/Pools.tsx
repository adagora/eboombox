import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { API_URL_MAESTRO, API_KEY_MAESTRO } from "../lib/api";
import { PoolData } from "./@types/pool";

export function useGetStakePoolInformation(
  poolId: string
): UseQueryResult<PoolData, Error> {
  return useQuery<PoolData, Error>({
    queryKey: ["stakePool", poolId],
    queryFn: async () => {
      const response = await fetch(`${API_URL_MAESTRO}/pools/${poolId}/info`, {
        headers: {
          Accept: "application/json",
          "api-key": API_KEY_MAESTRO!
        }
      });
      return response.json();
    },
    enabled: !!poolId
  });
}
