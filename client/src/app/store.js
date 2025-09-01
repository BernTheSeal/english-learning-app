import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../features/session/sessionSlice.js";
import appReducer from "../features/app/appSlice.js";
import userQueryReducer from "../features/user-query/userQuerySlice.js";
import userAccountReducer from "../features/user-account/userAccountSlice.js";
import wordHistoryReducer from "../features/word-history/wordHistorySlice.js";
import dictionaryReducer from "../features/dictionary/dictionarySlice.js";
import wordReducer from "../features/word/wordSlice.js";

const store = configureStore({
  reducer: {
    app: appReducer,
    session: sessionReducer,
    userQuery: userQueryReducer,
    userAccount: userAccountReducer,
    wordHistory: wordHistoryReducer,
    dictionary: dictionaryReducer,
    word: wordReducer,
  },
});

export default store;
