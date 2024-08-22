import React from "react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import styled from "@emotion/styled";
import WalletModal from "./WalletModal";

export default function WalletConnect() {
  const network =
    process.env.NEXT_PUBLIC_NODE_ENV === "development"
      ? NetworkType.TESTNET
      : NetworkType.MAINNET;
  const { isConnected, stakeAddress, disconnect, accountBalance } = useCardano({
    limitNetwork: network
  });

  return (
    <FlexContainer>
      {isConnected ? (
        <FlexContainer>
          <BalanceInfo>
            {stakeAddress!.slice(0, 10)}...
            {stakeAddress!.slice(stakeAddress!.length - 6)}
          </BalanceInfo>
          <BalanceInfo>{accountBalance}</BalanceInfo>
          <IconButton onClick={() => disconnect()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </FlexContainer>
      ) : (
        <WalletModal />
      )}
    </FlexContainer>
  );
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const BalanceInfo = styled.h1`
  margin: 0;
`;

const IconButton = styled.button`
  background: none;
  border: 1px solid;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    height: 24px;
    width: 24px;
  }
`;
