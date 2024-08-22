import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ACCESS_TOKEN_IAGON, API_URL_IAGON } from "../lib/api";
import { ShareResponse } from "./@types/storage";

export function useShareFile(
  fileId: string
): UseQueryResult<ShareResponse, Error> {
  return useQuery<ShareResponse, Error>({
    queryKey: ["shareFile", fileId],
    queryFn: async () => {
      const response = await fetch(`${API_URL_IAGON}/storage/${fileId}/share`, {
        method: "PATCH",
        headers: {
          "x-api-key": ACCESS_TOKEN_IAGON!
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`${errorResponse.errorMessage}`);
      }

      return response.json();
    },
    enabled: !!fileId
  });
}
