import { configureStore } from "@reduxjs/toolkit";
import { searchApi } from "../services/SearchService";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: false,
      thunk: true,
    }).concat(searchApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
