"use client";

import React from "react";
import Image from "next/image";
import { ConnectWallet } from "./ConnectWallet";
import styled from "@emotion/styled";

export default function NavBar() {
  return (
    <NavBarContainer>
      <LogoContainer>
        <Image
          src="/ada-logo.svg"
          alt="ADA Logo"
          width={60}
          height={24}
          priority
        />
      </LogoContainer>
      <ConnectWallet />
    </NavBarContainer>
  );
}

const NavBarContainer = styled.header`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  max-width: 5xl;
  align-items: center;
  justify-content: space-between;
  font-family: monospace;
  font-size: small;
  padding: 50px 100px 0px 100px;
`;

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
`;
