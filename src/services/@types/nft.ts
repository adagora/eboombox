export interface UploadNFTRequest {
  tokenname: string;
  displayname: string;
  description: string;
  previewImageNft: {
    mimetype: string;
    fileFromBase64: string;
    fileFromsUrl?: string;
    fileFromIPFS?: string;
  };
  subfiles?: [
    {
      subfile: {
        mimetype: string;
        fileFromBase64: string;
        fileFromsUrl: string;
        fileFromIPFS: string;
      };
      description: string;
      metadataPlaceholder: [
        {
          name: string;
          value: string;
        }
      ];
    }
  ];
  metadataPlaceholder?: [
    {
      name: string;
      value: string;
    }
  ];
  metadataOverride?: string;
  metadataOverrideCip68?: string;
  priceInLovelace: number;
  isBlocked: boolean;
}

export interface UploadNFTResponse {
  nftId: number;
  nftUid: string;
  ipfsHashMainnft: string;
  ipfsHashSubfiles: any[];
  metadata: string;
  assetId: string;
}

export interface MintAndSendResponse {
  mintAndSendId: number;
  sendedNft: {
    id: number;
    uid: string;
    name: string;
    displayname: string;
    detaildata: string;
    ipfsLink: string;
    gatewayLink: string;
    state: string;
    minted: boolean;
    policyId: string;
    assetId: string;
    assetname: string;
    fingerprint: string;
    initialMintTxHash: string;
    series: string;
    tokenamount: number;
    price: number;
    selldate: string;
    paymentGatewayLinkForSpecificSale: string;
    priceSolana: number;
  }[];
}
