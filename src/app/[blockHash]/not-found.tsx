"use client";

import Link from "next/link";
import styled from "@emotion/styled";
import { RiEmotionNormalLine } from "react-icons/ri";

const Main = styled.main`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Paragraph = styled.p`
  margin-top: 1rem;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  background-color: #1e40af;
  color: #fff;
  font-size: 0.875rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function NotFound() {
  return (
    <Main>
      <RiEmotionNormalLine />
      <Title>404 Not Found</Title>
      <Paragraph>Could not find the requested invoice.</Paragraph>
      <Link href="/">
        <StyledLink>Go Back</StyledLink>
      </Link>
    </Main>
  );
}
