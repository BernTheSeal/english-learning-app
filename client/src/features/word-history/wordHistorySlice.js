import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  history: null,
  loading: null,
  error: false,
};

export const getGlobalWordHistory = createAsyncThunk(
  "word-history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/word-history");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMyWordHistory = createAsyncThunk(
  "word-history/me",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/word-history/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const wordHistorySlice = createSlice({
  name: "word-history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGlobalWordHistory.pending, (state) => {
        state.loading = true;
        state.history = null;
      })
      .addCase(getGlobalWordHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data.history;
      })
      .addCase(getGlobalWordHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
    builder
      .addCase(getMyWordHistory.pending, (state) => {
        state.loading = true;
        state.history = null;
      })
      .addCase(getMyWordHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload.data.history;
      })
      .addCase(getMyWordHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default wordHistorySlice.reducer;
