import React from "react";
import { Global, css } from "@emotion/react";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        background: radial-gradient(
          ellipse at left top,
          #022234 0%,
          #051b17,
          #010f20
        );
        min-height: 100vh;
        width: 100vw;
        font-family: "Helvetica", "Arial", sans-serif;
        font-family: "Hack", monospace;
        font-size: 24px;
        color: #ffffff;
      }

      .Toastify__toast-container {
        font-size: 16px;
        color: #ffffff;
      }
    `}
  />
);

export const colors = {
  blue: `#00FFFF`,
  lightGreen: `#90EE90`,
  green: `#008000`,
  lightBlue: `#ADD8E6`,
  orange: `#FFA500`,
  red: `#FF0000`,
  yellow: `#FFFF00`,
  black: `#000000`,
  darkBlue: `#1c2030`
};
