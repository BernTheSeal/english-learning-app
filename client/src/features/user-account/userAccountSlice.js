import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  loading: false,
  message: null,
  errors: null,
};

export const createUser = createAsyncThunk(
  "user/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/account", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userAccountSlice = createSlice({
  name: "user-account",
  initialState,
  reducers: {
    clearAccountErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.message = "user olusturuldu";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export const { clearAccountErrors } = userAccountSlice.actions;

export default userAccountSlice.reducer;
