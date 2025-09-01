import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/axios";

const initialState = {
  isSession: null,
  loading: false,
  message: null,
  errors: null,
};

export const checkSession = createAsyncThunk(
  "session/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/session");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createSession = createAsyncThunk(
  "session/create",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/session/", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSession = createAsyncThunk(
  "session/delete",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/session");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const refreshSession = createAsyncThunk(
  "session/refresh",
  async ({ _, rejectWithValue }) => {
    try {
      const response = api.get("api/session/refresh");
      return response.data;
    } catch (error) {}
    return rejectWithValue(error.response.data);
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearSessionErrors: (state) => {
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSession.fulfilled, (state) => {
        state.isSession = true;
        state.loading = false;
      })
      .addCase(checkSession.rejected, (state) => {
        state.isSession = false;
        state.loading = false;
      });

    builder
      .addCase(createSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
    builder
      .addCase(refreshSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshSession.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refreshSession.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSessionErrors } = sessionSlice.actions;

export default sessionSlice.reducer;
