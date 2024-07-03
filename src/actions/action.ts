"use server";

import { BlockSummary } from "../services/@types/block";
import {
  MintAndSendResponse,
  UploadNFTRequest,
  UploadNFTResponse
} from "../services/@types/nft";
import { API_KEY_NMKR, API_URL_NMKR } from "../lib/api";

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

  if (!baseShareableLink) {
    return {
      message: "Please first upload downloaded *.mp3 to IAGON cloud service"
    };
  }

  const projectuid = "5cd36d4b-02eb-46b2-a38b-dd6d680148dc";
  const tokencount = 1;
  const receiveraddress = usedAddress;

  try {
    const uploadBody: UploadNFTRequest = {
      tokenname: fileName,
      displayname: fileName,
      description: "musically presented block range",
      previewImageNft: {
        mimetype: "image/jpeg",
        fileFromBase64: base64Image,
        fileFromsUrl: baseShareableLink
      },
      priceInLovelace: 4500000,
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
    console.log("uploadBody", uploadBody);
    console.log("uploadNFTResponse", uploadNFTResponse);

    if (!uploadNFTResponse.ok) {
      return { message: "Minting Failed" };
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
      return { message: "Minting Failed" };
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
