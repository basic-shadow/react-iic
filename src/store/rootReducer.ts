import { combineReducers } from "@reduxjs/toolkit";
import { searchApi } from "../services/SearchService";
import { favoritesReducer } from "./slicesAndThunks/favorites/favorites.slice";
import { searchReducer } from "./slicesAndThunks/search/search.slice";

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  search: searchReducer,
  [searchApi.reducerPath]: searchApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
