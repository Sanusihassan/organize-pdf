import { createSlice, createSelector, type Draft, type PayloadAction } from "@reduxjs/toolkit";

type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;

export interface ToolState {
  showTool: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  errorCode: string | null;
  showDownloadBtn: boolean;
  showOptions: boolean;
  fileName: string;
  limitationMsg: string;
  rotations: { k: string; r: number }[];
  passwords: { k: string; p: string }[];
  subscriptionStatus: boolean | null;
  isAdBlocked: boolean;
  ocr_warning: string;
  pageCount: number;
  pageOrders: number[]; // Add this
  selectedFile: string
}

const initialState: ToolState = {
  showTool: true,
  errorMessage: "",
  isSubmitted: false,
  errorCode: null,
  showDownloadBtn: false,
  showOptions: false,
  fileName: "",
  limitationMsg: "",
  rotations: [],
  passwords: [],
  subscriptionStatus: null,
  isAdBlocked: false,
  ocr_warning: "",
  pageCount: 0,
  pageOrders: [],
  selectedFile: ""
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setField(state, action: PayloadAction<Partial<ToolState>>) {
      Object.keys(action.payload).forEach((key) => {
        const typedKey = key as k;
        const value = action.payload[typedKey];
        if (value !== undefined) {
          // @ts-ignore
          state[typedKey] = value;
        }
      });
    },
  },
});

export const { resetErrorMessage, setField } = toolSlice.actions;

// ============================================
// MEMOIZED SELECTORS (prevent unnecessary rerenders)
// ============================================

/**
 * Select the entire tool state
 */
export const selectToolState = (state: { tool: ToolState }) => state.tool;

export const selectRotations = createSelector(
  [selectToolState],
  (state) => state.rotations
);

export const selectPasswords = createSelector(
  [selectToolState],
  (state) => state.passwords
);


export default toolSlice.reducer;