import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { ACCESS_TOKEN_IAGON, API_URL_IAGON } from "../lib/api";
import { FilterfilesResponse } from "./@types/storage";

export function useFilterFiles(
  query: string,
  visibility: string,
  listingType: string
): UseQueryResult<FilterfilesResponse, Error> {
  return useQuery<FilterfilesResponse, Error>({
    queryKey: ["filterFiles", query, visibility, listingType],
    queryFn: async () => {
      const response = await fetch(
        `${API_URL_IAGON}/storage/filter?q=${query}&visibility=${visibility}&listingType=${listingType}`,
        {
          method: "GET",
          headers: {
            "x-api-key": ACCESS_TOKEN_IAGON!
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    },
    enabled: !!query
  });
}
