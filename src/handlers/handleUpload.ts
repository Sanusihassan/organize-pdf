// ============================================================================
// REFACTORED handleUpload.ts (organize-pdf) - Using Blob Pattern
// ============================================================================

import axios from "axios";
import type { errors as _ } from "../content";
import { resetErrorMessage, setField } from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import { parseErrorResponse } from "../utils";

// ============================================================================
// FIX: Properly typed module variables (fixes TS7034)
// ============================================================================

let filesOnSubmit: string[] = [];
let prevState: string | null = null;

// ============================================================================
// HELPERS
// ============================================================================

interface UploadResponse {
  blob: Blob;
  mimeType: string;
}

async function sendRequest(
  url: string,
  formData: FormData
): Promise<UploadResponse> {
  try {
    const response = await axios.post(url, formData, {
      responseType: "blob",
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"] || "application/pdf",
    });

    return {
      blob,
      mimeType: response.headers["content-type"] || "application/pdf",
    };
  } catch (err: any) {
    // Error response might also be a Blob
    if (err.response?.data instanceof Blob) {
      try {
        const text = await err.response.data.text();
        err.response.data = JSON.parse(text);
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError);
        err.response.data = { code: "SERVER_ERROR" };
      }
    }
    throw err;
  }
}

// ============================================================================
// MAIN HANDLER (Refactored)
// ============================================================================

export const handleUpload = async (
  e: React.SubmitEvent<HTMLFormElement>,
  // NOTE: downloadBtn parameter REMOVED
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    fileName: string;
    pageOrders: number[]; // Page order array for organize-pdf
  },
  files: File[],
  errors: _,
  setDownloadBlob: (blob: Blob, filename: string) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) {
    dispatch(setField({ isSubmitted: false }));
    return;
  }

  // ════════════════════════════════════════════════════════════════════════
  // organize-pdf only accepts a single file
  // ════════════════════════════════════════════════════════════════════════

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

  // ────────────────────────────────────────────────────────────────────────
  // Prepare FormData for organize-pdf
  // ────────────────────────────────────────────────────────────────────────

  const formData = new FormData();
  formData.append("file", file); // Single file
  formData.append("pageOrders", JSON.stringify(state.pageOrders)); // Page orders

  // ────────────────────────────────────────────────────────────────────────
  // Build URL
  // ────────────────────────────────────────────────────────────────────────

  let url: string = "";
  let endpoint = "/api/";

  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `http://localhost:8000${endpoint}${state.path}`;
  } else {
    url = `${endpoint}${state.path}`;
  }

  // Early exit if there's already an error
  if (state.errorMessage) {
    dispatch(setField({ isSubmitted: false }));
    return;
  }

  // Get original filename for download
  const originalFileName =
    state.fileName || file.name.split(".").slice(0, -1).join(".");

  // ────────────────────────────────────────────────────────────────────────
  // API Call & Blob Handling
  // ────────────────────────────────────────────────────────────────────────

  try {
    // NEW: Use sendRequest helper
    const { blob } = await sendRequest(url, formData);

    // ════════════════════════════════════════════════════════════════════════
    // organize-pdf always returns a PDF
    // ════════════════════════════════════════════════════════════════════════

    const outputFileName = `${originalFileName}-organized.pdf`;
    const outputFileMimeType = "application/pdf";

    // Ensure blob has correct PDF MIME type
    const typedBlob = new Blob([blob], {
      type: outputFileMimeType,
    });

    // ───────────────────────────────────────────────────────────────────────
    // NEW: Deferred download via setDownloadBlob
    // ───────────────────────────────────────────────────────────────────────
    setDownloadBlob(typedBlob, outputFileName);

    // Update tracking
    filesOnSubmit = files.map((f) => f.name);

    // Update UI state
    dispatch(setField({ showDownloadBtn: true }));
    dispatch(resetErrorMessage());
    dispatch(setField({ isSubmitted: false }));
  } catch (error) {
    // ───────────────────────────────────────────────────────────────────────
    // Error Handling
    // ───────────────────────────────────────────────────────────────────────

    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      dispatch(setField({ isSubmitted: false }));
      return;
    }

    // Handle server validation/auth errors
    if (axios.isAxiosError(error) && error.response) {
      try {
        // FIX: Properly type errorCode (fixes TS2538)
        const errorCodeMap: Record<string, string> = {
          // General file validation errors
          NO_FILES_PROVIDED:
            errors.alerts.fileNotUploaded || "No files provided",
          FILE_NOT_UPLOADED:
            errors.alerts.fileNotUploaded || "File not uploaded",
          FILE_EMPTY: errors.alerts.fileEmpty || "File is empty",
          FILE_TOO_LARGE: errors.alerts.fileTooLarge || "File is too large",
          INVALID_FILE_TYPE:
            errors.alerts.invalidFileType || "Invalid file type",
          FILE_CORRUPT: errors.alerts.fileCorrupt || "File is corrupted",

          // PDF-specific errors
          INVALID_PDF: errors.alerts.invalidPdf || "Invalid PDF file",

          // organize-pdf specific errors
          NO_PAGE_ORDERS_PROVIDED:
            errors.alerts.noPageOrders || "No page order provided",
          INVALID_PAGE_ORDERS:
            errors.alerts.invalidPageOrders || "Invalid page order format",
          PAGE_ORDERS_NOT_REORDERED:
            errors.alerts.pageOrdersNotReordered ||
            "Pages are already in original order",
          ORGANIZING_FAILED:
            errors.alerts.organizingFailed ||
            "Failed to organize PDF. Please try again.",

          // Auth errors
          UNAUTHORIZED: errors.alerts.authRequired || "Authentication required",
          MAX_PAGES_EXCEEDED:
            errors.MAX_PAGES_EXCEEDED?.message || "Maximum pages exceeded",
        };

        const { errorCode } = parseErrorResponse(error);

        // FIX: Check if errorCode exists before indexing (fixes TS2538)
        if (errorCode && errorCode in errorCodeMap) {
          const message = errorCodeMap[errorCode];
          dispatch(setField({ limitationMsg: message }));
          dispatch(setField({ errorCode }));
          dispatch(setField({ isSubmitted: false }));
          return;
        }
      } catch {
        // Failed to parse error response
      }
    }

    dispatch(setField({ isSubmitted: false }));
  }
};