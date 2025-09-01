import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const toggleWordFrequency = createAsyncThunk(
  "word/wordId/frequency",
  async ({ point, wordId }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/api/word/${wordId}/frequency`, { point });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  loading: false,
  errors: null,
};

const wordSlice = createSlice({
  name: "word",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWordFrequency.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleWordFrequency.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(toggleWordFrequency.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors;
      });
  },
});

export default wordSlice.reducer;
