import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  user: null,
  isAuthenticated: null,
  loading: false,
  message: null,
  errors: null,
};

export const checkAuth = createAsyncThunk(
  "auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/auth/check-auth");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await api.post("/api/auth/logout");
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const sendVerificationCode = createAsyncThunk(
  "auth/send-verification-code",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/send-verification-code");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isAuthenticated = null;
        state.message = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      });
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors;
        state.message = action.payload.message;
      });
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload.errors;
        state.isAuthenticated = false;
        state.message = action.payload.message;
      });
    builder
      .addCase(sendVerificationCode.pending, (state) => {
        state.message = null;
      })
      .addCase(sendVerificationCode.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(sendVerificationCode.rejected, (state, action) => {
        state.message = action.payload.message;
      });
  },
});

export default authSlice.reducer;
