import { combineReducers } from "@reduxjs/toolkit";
import { searchApi } from "../services/SearchService";
import { favoritesReducer } from "./slicesAndThunks/favorites/favorites.slice";

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
