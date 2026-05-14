import authReducer from "./authSlice";
import jobSlice from "./jobSlice";
import jobReducer from "./jobSlice";
import companySlice from "./companySlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { applicationReducer } from "./applicationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};
const rootReducer = combineReducers({
  auth: authReducer,
  job: jobSlice,
  jobs: jobReducer,
  company: companySlice,
  application: applicationReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
