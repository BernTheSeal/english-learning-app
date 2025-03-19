import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/auth/authSlice';
import userSlice from '../redux/user/userSlice';
import wordSlice from './word/wordSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken'],
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: userSlice,
    word: wordSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
