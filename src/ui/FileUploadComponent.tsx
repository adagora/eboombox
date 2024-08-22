"use client";

import React, { useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { PASSWORD_IAGON } from "../lib/api";
import { useUploadFile } from "../services/Storage";
import styled from "styled-components";
import { colors } from "../utils/styles";

export default function FileUploadComponent() {
  const { mutate: uploadFile, isPending, error } = useUploadFile();

  useEffect(() => {
    if (error) {
      toast.error(`${error?.message}`, { toastId: "" });
    } else {
      toast.dismiss();
    }
  }, [error]);

  const handleUpload = (file: File) => {
    uploadFile(
      {
        file: file,
        visibility: "public",
        filename: file.name,
        password: PASSWORD_IAGON
      },
      {
        onSuccess: (data) => {
          toast.success(`${data.message}. Name: ${data.data.name} `);
        }
      }
    );
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <div>
      <label htmlFor="fileUpload" style={{ cursor: "pointer" }}>
        <StyledDownloadButton />
      </label>
      <input
        id="fileUpload"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {isPending ? <p>Uploading...</p> : null}
    </div>
  );
}

const StyledDownloadButton = styled(FaUpload)`
  color: white;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  :hover {
    color: ${colors.orange};
  }
`;
