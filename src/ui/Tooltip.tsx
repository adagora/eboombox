import React, { useState, ReactNode } from "react";
import styled from "styled-components";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
  delay?: number;
}

const TooltipWrapper = styled.div`
  //   position: relative;
  //   display: inline-block;
`;

const TooltipContent = styled.div<{ position: string }>`
  position: absolute;
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  z-index: 100;
  pointer-events: none;

  ${({ position }) => {
    switch (position) {
      case "top":
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 5px;
        `;
      case "right":
        return `
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
          margin-left: 5px;
        `;
      case "bottom":
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 5px;
        `;
      case "left":
        return `
          top: 50%;
          right: 100%;
          transform: translateY(-50%);
          margin-right: 5px;
        `;
    }
  }}
`;

export default function Tooltip({
  content,
  children,
  position = "top",
  delay = 400
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  let timeout: NodeJS.Timeout;

  const showTooltip = () => {
    timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    clearTimeout(timeout);
    setIsVisible(false);
  };

  return (
    <TooltipWrapper onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <TooltipContent position={position}>{content}</TooltipContent>
      )}
    </TooltipWrapper>
  );
}
