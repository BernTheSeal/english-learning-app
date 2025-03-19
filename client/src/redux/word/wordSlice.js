import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

const initialState = {
  wordInfo: null,
  historyWords: null,
  error: null,
  loading: false,
};

export const getWordInfo = createAsyncThunk('words/word', async (word, { rejectWithValue }) => {
  try {
    const response = await api.get(`/api/words/${word}`);
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

export const addWord = createAsyncThunk(
  'words/add',
  async ({ word, status }, { rejectWithValue }) => {
    try {
      const response = await api.post('api/words/add', { word, status });
    } catch (error) {
      console.log(error.message);
      if (error.respnse && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(['Something went wrong']);
      }
    }
  },
);

export const deleteWord = createAsyncThunk('words/delete', async (word, { rejectWithValue }) => {
  try {
    await api.post('api/words/delete', { word });
  } catch (error) {
    console.log(error.message);
    if (error.respnse && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue(['Something went wrong']);
    }
  }
});

const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWordInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWordInfo.fulfilled, (state, action) => {
        console.log('fulfilled', action.payload.data);
        state.loading = false;
        state.error = false;
        state.wordInfo = action.payload.data;
      })
      .addCase(getWordInfo.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.wordInfo = null;
      });
  },
});

export default wordSlice.reducer;
