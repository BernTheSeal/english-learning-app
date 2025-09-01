import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  wordInfo: null,
  loading: false,
  message: null,
  errors: null,
};

export const getWordFromDictionary = createAsyncThunk(
  "dictionary",
  async (word, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/dictionary/${word}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWordFromDictionary.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWordFromDictionary.fulfilled, (state, action) => {
        state.wordInfo = action.payload.data.wordInfo;
        state.loading = false;
      })
      .addCase(getWordFromDictionary.rejected, (state, action) => {
        state.wordInfo = action.payload.error;
        state.loading = false;
      });
  },
});

export default dictionarySlice.reducer;
