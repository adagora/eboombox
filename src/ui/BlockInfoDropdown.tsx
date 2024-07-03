import React from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { colors } from "../utils/styles";
import { useGetStakePoolInformation } from "../services/Pools";
import { BlockSummary } from "../services/@types/block";

interface BlockInfoSideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  blockInfo: BlockSummary["data"] | null;
}
export default function BlockInfoSideMenu({
  isOpen,
  onClose,
  blockInfo
}: BlockInfoSideMenuProps) {
  const { data: stakePoolInformationData } = useGetStakePoolInformation(
    blockInfo?.block_producer as string
  );

  if (!isOpen || !blockInfo) return null;

  return (
    <SideMenuContainer isOpen={isOpen}>
      <Header>
        <h2>Block Information</h2>
        <CloseButton onClick={onClose}>
          <FaTimes />
        </CloseButton>
      </Header>
      <Content>
        <InfoItem>
          <Label>Epoch:</Label>
          <Value>{blockInfo.epoch}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Height:</Label>
          <Value>{blockInfo.height}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Transactions:</Label>
          <Value>{blockInfo.tx_hashes.length}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Confirmations:</Label>
          <Value>{blockInfo.confirmations}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Timestamp:</Label>
          <Value>{new Date(blockInfo.timestamp).toLocaleString()}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Total Fees:</Label>
          <Value>{blockInfo.total_fees} lovelance</Value>
        </InfoItem>
        <InfoItem>
          <Label>Era:</Label>
          <Value>{blockInfo.era}</Value>
        </InfoItem>
        <InfoItem>
          <Label>Block Producer:</Label>
          <Value>
            {stakePoolInformationData?.data?.meta_json?.name ||
              "not known name"}
          </Value>
        </InfoItem>
      </Content>
    </SideMenuContainer>
  );
}

const SideMenuContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 350px;
  height: 100%;
  background: ${colors.darkBlue};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${(props) => (props.isOpen ? "0" : "100%")});
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid ${colors.lightBlue};

  h2 {
    color: white;
    margin: 0;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${colors.lightBlue};
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  color: white;
  overflow-y: auto;
  height: calc(100% - 70px);
`;

const InfoItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
  color: ${colors.lightGreen};
`;

const Value = styled.span`
  text-align: right;
`;
