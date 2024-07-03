"use client";

import React from "react";
import styled from "@emotion/styled";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import Image from "next/image";
import { useState } from "react";

declare global {
  interface Window {
    my_modal: any;
    cardano: any;
  }
}

export default function WalletModal() {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const network =
    process.env.NODE_ENV === "development"
      ? NetworkType.TESTNET
      : NetworkType.MAINNET;
  const { isConnected, connect, installedExtensions } = useCardano({
    limitNetwork: network
  });

  return (
    <div>
      <Button onClick={() => setModalVisible(true)}>
        {isConnected ? "CONNECTED" : "CONNECT"}
      </Button>
      {isModalVisible ? (
        <Modal id="my_modal" open={isModalVisible}>
          <ModalBox method="dialog">
            <div>
              {installedExtensions && installedExtensions.length > 0 ? (
                installedExtensions.map((provider: string) => (
                  <FlexDiv key={provider}>
                    <Button onClick={() => connect(provider)}>
                      {provider.toUpperCase()}
                    </Button>
                    <span>
                      <Image
                        src={window.cardano[provider].icon}
                        alt={provider}
                        width={36}
                        height={10}
                      />
                    </span>
                  </FlexDiv>
                ))
              ) : (
                <FlexDiv>please install cardano wallet</FlexDiv>
              )}
            </div>
          </ModalBox>
          <form method="dialog" className="modal-backdrop">
            <CloseButton onClick={() => setModalVisible(false)}>
              close
            </CloseButton>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

const Button = styled.button`
  border: 1px solid;
  padding: 8px 16px;
  cursor: pointer;
  background: none;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const Modal = styled.dialog`
  display: block;
  width: auto;
  max-width: 500px;
  margin: 1.75rem auto;
  padding: 2rem 1rem 2rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 32px;
  z-index: 1000;
  background: black;
`;

const ModalBox = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 640px) {
    gap: 1.5rem;
  }

  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  color: #ffffff;
  font-size: 16px;
  min-width: 200px;
  max-witdh: 250px;
  padding: 8px 16px;
  display: block;
  margin: 0 auto;

  &:hover {
    text-decoration: underline;
  }
`;
