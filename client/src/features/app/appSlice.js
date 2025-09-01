import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMe } from "../user-query/userQuerySlice";

export const loadAppData = createAsyncThunk("app/loadAppData", async (_, thunkAPI) => {
  await thunkAPI.dispatch(getMe());
});

const appSlice = createSlice({
  name: "app",
  initialState: {
    initialHasChecked: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAppData.fulfilled, (state) => {
        state.initialHasChecked = true;
      })
      .addCase(loadAppData.rejected, (state) => {
        state.initialHasChecked = true;
      });
  },
});

export default appSlice.reducer;
