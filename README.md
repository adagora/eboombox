# Cardano Transaction to Soundtrack

## Overview

This project retrieves blocks from the Cardano blockchain and fetches the latest transactions. It then breaks down transaction hashes into 4-bit parts and matches these parts against a library of techno samples. The result is a unique soundtrack generated from blockchain data.

![App Screen](appscreen.png)

## Features

- Fetch data from the Maestro API
- Download generated soundtracks as `.mp3` files to local disk
- Option to upload `.mp3` files to the Iagon storage service
- Mint a digital asset representing the generated soundtrack

## Technologies Used

- **Maestro API**: For fetching blocks and submitting mint transactions
- **Iagon Storage**: For storing `.mp3` files
- **NMKR**: for minting service

## Intended Use

This application is designed for educational and entertainment purposes. It serves as a fun exploration of the intersection between blockchain technology and music creation.

## Future Expansions

- Extend functionality to include events from Wanchain
- Additional features to enhance user experience

## Technologies Used

- **Maestro API**: For fetching blocks and submitting mint transactions
- **Iagon Storage**: For storing `.mp3` files
  = **NMKR**: minting
- **Next.js**
- **Vercel**
- **Cairo**
- **cardano-foundation/cardano-connect-with-wallet**
- **lucid-cardano**
- **React Query**

## Credits & inspiration

```
https://github.com/beeinger/eth-warsaw
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/cardano-soundtrack.git
   ```
2. install

```bash
yarn install
or
npm install
```

3. run

```bash
yarn dev
or
npm run dev
```

4. create .env.local file

```bash
NEXT_PUBLIC_MAESTRO_API_URL=https://mainnet.gomaestro-api.org/v1
NEXT_PUBLIC_TRANSACTIONS_PER_TRACK=10
NEXT_PUBLIC_SELF_URL=http://localhost:3000
NEXT_PUBLIC_MAESTRO_API_KEY=
NODE_ENV=development
NEXT_PUBLIC_IAGON_API_URL=https://gw.iagon.com/api/v2
NEXT_PUBLIC_IAGON_ACCESS_TOKEN=""
NEXT_PUBLIC_IAGON_PASSWORD=

NEXT_PUBLIC_NMKR_API_KEY=
NEXT_PUBLIC_NMKR_API_URL=https://studio-api.preprod.nmkr.io/v2
NEXT_PUBLIC_NMKR_PROJECT_UID=

```

5. API NMKR
   setup an account on NMKR studio:
   you need:

- UID of the NFT project to mint under the same policy API key for using the APIs
- MINT coupons to mint directly from the API on the go
- You can find all the docs of the NMKR APIs here https://studio-api.nmkr.io/swagger/index.html but we'll be using the following:

- /v2/UploadNft/{projectuid} to upload an image as NFT on NMKR studio
- /v2/MintAndSendSpecific/{projectuid}/{nftuid}/{tokencount}/{receiveraddress} This will mint a specific NFT and send to an address

6. Install Nami or Eternl or your prefered cardano wallet, mainly to mint nft.
