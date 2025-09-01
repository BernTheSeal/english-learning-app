import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  me: null,
  user: null,
  loading: false,
  message: null,
};

export const getMe = createAsyncThunk("user/query/me", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/user/me");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const userQuerySlice = createSlice({
  name: "user-query",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.loading = false;
        state.me = action.payload.data.me;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userQuerySlice.reducer;
