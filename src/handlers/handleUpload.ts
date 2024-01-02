import axios from "axios";
import { Dispatch, RefObject } from "react";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../../content";
import { AnyAction } from "@reduxjs/toolkit";
import {
  resetErrorMessage,
  setErrorMessage,
  setIsSubmitted,
  setShowDownloadBtn,
} from "../store";

let prevState: {
  pageOrders: number[];
} = {
  pageOrders: [],
};

function comparePageOrders(
  prevStatePageOrders: number[],
  currentPageOrders: number[]
): boolean {
  if (prevStatePageOrders.length !== currentPageOrders.length) {
    return false;
  }

  // Using every() to compare each element in both arrays
  const areEqual = prevStatePageOrders.every(
    (value, index) => value === currentPageOrders[index]
  );

  return areEqual;
}

export const handleUpload = async (
  e: React.FormEvent<HTMLFormElement>,
  downloadBtn: RefObject<HTMLAnchorElement>,
  dispatch: Dispatch<AnyAction>,
  state: {
    path: string;
    errorMessage: string;
  },
  files: File[],
  errors: _,
  filesOnSubmit: string[],
  setFilesOnSubmit: (value: string[]) => void,
  pageOrders: number[]
) => {
  e.preventDefault();
  dispatch(setIsSubmitted(true));

  if (!files) return;
  // Extract file names from the File[] array
  const fileNames = files.map((file) => file.name);

  // Check if every file name in files is present in filesOnSubmit
  const allFilesPresent = fileNames.every((fileName) =>
    filesOnSubmit.includes(fileName)
  );

  if (
    allFilesPresent &&
    files.length === filesOnSubmit.length &&
    comparePageOrders(prevState.pageOrders, pageOrders)
  ) {
    dispatch(setShowDownloadBtn(true));
    dispatch(resetErrorMessage());
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  // selected languages
  formData.append("pageOrders", JSON.stringify(pageOrders));
  let url;
  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `https://8000-sanusihassa-pdfequipsap-4s5c76gda53.ws-eu107.gitpod.io/api/${state.path}`;
  } else {
    url = `/api/${state.path || "organize-pdf"}`;
  }
  if (state.errorMessage) {
    return;
  }
  // formData.append("compress_amount", String(state.compressPdf));
  const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");

  const mimeTypeLookupTable: {
    [key: string]: { outputFileMimeType: string; outputFileName: string };
  } = {
    "application/zip": {
      outputFileMimeType: "application/zip",
      outputFileName: `PDFEquips-${state.path}.zip`,
    },
    "application/pdf": {
      outputFileMimeType: "application/pdf",
      outputFileName: `${originalFileName}.pdf`,
    },
  };

  try {
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
    });
    // const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");
    const mimeType = response.data.type || response.headers["content-type"];
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };
    const { outputFileMimeType, outputFileName } = mimeTypeData;

    dispatch(setShowDownloadBtn(true));
    downloadConvertedFile(
      response,
      outputFileMimeType,
      outputFileName,
      downloadBtn
    );
    setFilesOnSubmit(files.map((f) => f.name));
    prevState = { pageOrders };

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      dispatch(resetErrorMessage());
      dispatch(setIsSubmitted(false));
    }
  } catch (error) {
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setErrorMessage(errors.ERR_NETWORK.message));
      // return;
    }
    dispatch(setIsSubmitted(false));
  } finally {
    dispatch(setIsSubmitted(false));
  }
};
