import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface uiState {
  loading: boolean;
}
const initialState: uiState = {
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
