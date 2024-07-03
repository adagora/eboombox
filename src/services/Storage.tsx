import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { ACCESS_TOKEN_IAGON, API_URL_IAGON } from "../lib/api";
import { UploadRequest, UploadResponse } from "./@types/storage";

export function useUploadFile(): UseMutationResult<
  UploadResponse,
  Error,
  UploadRequest,
  unknown
> {
  return useMutation<UploadResponse, Error, UploadRequest, unknown>({
    mutationKey: ["uploadFile"],
    mutationFn: async (variables: UploadRequest) => {
      const formData = new FormData();
      formData.append("file", variables.file);
      if (variables.filename) formData.append("filename", variables.filename);
      if (variables.visibility)
        formData.append("visibility", variables.visibility);
      if (variables.password) formData.append("password", variables.password);
      if (variables.index_listing !== undefined)
        formData.append("index_listing", variables.index_listing.toString());
      if (variables.directoryId)
        formData.append("directoryId", variables.directoryId);

      const response = await fetch(`${API_URL_IAGON}/storage/upload`, {
        method: "POST",
        headers: {
          "x-api-key": ACCESS_TOKEN_IAGON!
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      return response.json();
    }
  });
}
