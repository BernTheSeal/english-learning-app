import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  user: null,
  savedWords: null,
  error: null,
  loading: false,
};

export const getCurrentUser = createAsyncThunk('user/dashboard', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/user/getCurrentUser');
    return response.data;
  } catch (error) {
    console.log(error.message);
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(['Something went wrong']);
    }
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload.data.user;
        state.words = action.payload.data.words;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.user = null;
      });
  },
});

export default userSlice.reducer;
