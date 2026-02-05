// now let's implement organize-pdf backend.
// handleUpload.ts (organize-pdf specific)
import axios from "axios";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../content";
import { type RefObject } from "react";
import { resetErrorMessage, setField } from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import { parseErrorResponse } from "../utils";

let filesOnSubmit: string[] = [];
let prevState: string | null = null;

export const handleUpload = async (
  e: React.SubmitEvent<HTMLFormElement>,
  downloadBtn: React.RefObject<HTMLAnchorElement | null>,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    fileName: string;
    pageOrders: number[]; // ✅ Only need pageOrders for organize-pdf
  },
  files: File[],
  errors: _
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) return;

  // ✅ organize-pdf only accepts a single file
  const file = files[0];

  // Extract file names from the File[] array
  const fileNames = files.map((file) => file.name);

  // Check if every file name in files is present in filesOnSubmit
  const allFilesPresent = fileNames.every((fileName) =>
    filesOnSubmit.includes(fileName)
  );
  const strState = JSON.stringify(state);

  if (
    allFilesPresent &&
    files.length === filesOnSubmit.length &&
    prevState === strState
  ) {
    dispatch(setField({ showDownloadBtn: true }));
    dispatch(resetErrorMessage());
    return;
  }
  prevState = strState;

  // ✅ Prepare form data for organize-pdf
  const formData = new FormData();
  formData.append("file", file); // Single file
  formData.append("pageOrders", JSON.stringify(state.pageOrders)); // Page orders

  let url: string = "";
  let endpoint = "/api/";

  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:8000${endpoint}${state.path}`;
  } else {
    url = `${endpoint}${state.path}`;
  }

  if (state.errorMessage) {
    return;
  }

  const originalFileName =
    state.fileName || file.name.split(".").slice(0, -1).join(".");

  try {
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
      withCredentials: true,
    });

    const mimeType = response.data.type || response.headers["content-type"];

    // ✅ organize-pdf always returns a PDF
    const outputFileName = `${originalFileName}-organized.pdf`;
    const outputFileMimeType = "application/pdf";

    dispatch(setField({ showDownloadBtn: true }));
    downloadConvertedFile(
      response,
      outputFileMimeType,
      outputFileName,
      downloadBtn
    );
    filesOnSubmit = files.map((f) => f.name);

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      dispatch(resetErrorMessage());
      dispatch(setField({ isSubmitted: false }));
    }
  } catch (error) {
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      return;
    }

    // Handle server validation/auth errors
    if (axios.isAxiosError(error) && error.response) {
      try {
        const errorCodeMap: Record<string, string> = {
          // General file validation errors
          'NO_FILES_PROVIDED': errors.alerts.fileNotUploaded || 'No files provided',
          'FILE_NOT_UPLOADED': errors.alerts.fileNotUploaded || 'File not uploaded',
          'FILE_EMPTY': errors.alerts.fileEmpty || 'File is empty',
          'FILE_TOO_LARGE': errors.alerts.fileTooLarge || 'File is too large',
          'INVALID_FILE_TYPE': errors.alerts.invalidFileType || 'Invalid file type',
          'FILE_CORRUPT': errors.alerts.fileCorrupt || 'File is corrupted',

          // PDF-specific errors
          'INVALID_PDF': errors.alerts.invalidPdf || 'Invalid PDF file',

          // ✅ organize-pdf specific errors
          'NO_PAGE_ORDERS_PROVIDED': errors.alerts.noPageOrders,
          'INVALID_PAGE_ORDERS': errors.alerts.invalidPageOrders,
          'PAGE_ORDERS_NOT_REORDERED': errors.alerts.pageOrdersNotReordered,
          'ORGANIZING_FAILED': errors.alerts.organizingFailed,

          // Auth errors
          'UNAUTHORIZED': errors.alerts.authRequired,
          'MAX_PAGES_EXCEEDED': errors.MAX_PAGES_EXCEEDED?.message,
        };

        const { errorCode } = parseErrorResponse(error);
        const message = errorCodeMap[errorCode as keyof typeof errorCodeMap];

        if (message) {
          dispatch(setField({ limitationMsg: message }));
          dispatch(setField({ errorCode }));
          return;
        }
      } catch {
        // Failed to parse error response
      }
    }

    dispatch(setField({ isSubmitted: false }));
  } finally {
    dispatch(setField({ isSubmitted: false }));
  }
};