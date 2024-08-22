"use server";

import { BlockSummary } from "../services/@types/block";
import {
  MintAndSendResponse,
  UploadNFTRequest,
  UploadNFTResponse
} from "../services/@types/nft";
import { API_KEY_NMKR, API_URL_NMKR } from "../lib/api";
import { NMKR_PROJECT_UID } from "../lib/mintingUtils";
import { truncateHash } from "../ui/BoomBox";

export const handleMint = async (
  isConnected: boolean,
  blockWithTxns: BlockSummary | null,
  fileName: string,
  base64Image: string,
  usedAddress: string,
  baseShareableLink?: string
) => {
  if (!isConnected) {
    return {
      message: "To mint, connect your wallet!"
    };
  }

  if (!blockWithTxns) {
    return {
      message: "Let the thing load first..."
    };
  }

  if (!fileName) {
    return {
      message: "No name, you should download track first"
    };
  }

  // if (!baseShareableLink) {
  //   return {
  //     message: "Please first upload downloaded *.mp3 to IAGON cloud service"
  //   };
  // }

  const projectuid = NMKR_PROJECT_UID;
  const tokencount = 1;
  const receiveraddress = usedAddress;
  const priceInLovelace = 4500000;
  const description = "musically presented block range";
  //name need to be unique
  const name = `eboombox${blockWithTxns.data.height}`;

  try {
    const uploadBody: UploadNFTRequest = {
      tokenname: name,
      displayname: fileName,
      description: description,
      previewImageNft: {
        mimetype: "image/jpeg",
        fileFromBase64: base64Image
      },
      subfiles: [
        {
          subfile: {
            mimetype: "audio/mp3",
            fileFromsUrl: baseShareableLink || ""
          }
        }
      ],
      priceInLovelace: priceInLovelace,
      isBlocked: false
    };

    const uploadNFTResponse = await fetch(
      `${API_URL_NMKR}/UploadNft/${projectuid}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_NMKR}`,
          accept: "text/plain"
        },
        body: JSON.stringify(uploadBody)
      }
    );

    if (!uploadNFTResponse.ok) {
      const errorResponse = await uploadNFTResponse.json();
      return { message: `Failed to upload NFT: ${errorResponse.errorMessage}` };
    }

    const uploadResult: UploadNFTResponse = await uploadNFTResponse.json();
    const uploadedNftuid = uploadResult.nftUid;

    const MintAndSendSpecificResponse = await fetch(
      `${API_URL_NMKR}/MintAndSendSpecific/${projectuid}/${uploadedNftuid}/${tokencount}/${receiveraddress}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY_NMKR}`,
          Accept: "text/plain"
        }
      }
    );

    if (!MintAndSendSpecificResponse.ok) {
      const errorResponse = await MintAndSendSpecificResponse.json();

      return { message: `Failed to mint NFT ${errorResponse.errorMessage}` };
    }

    const mintResult: MintAndSendResponse =
      await MintAndSendSpecificResponse.json();

    return {
      message: `NFT minted successfully!, Asset ID: ${mintResult.sendedNft[0].name}`
    };
  } catch (e: any) {
    return {
      message: e.errorMessage
    };
  }
};
