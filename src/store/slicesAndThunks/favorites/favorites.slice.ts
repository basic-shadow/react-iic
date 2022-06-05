import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { likedItemsKey } from "../../../utils/const";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [] as any[],
  reducers: {
    fetchFavorites: () => {
      const data = JSON.parse(localStorage?.getItem(likedItemsKey) || "[]");

      return data;
    },

    addToFavorites: (state, action: PayloadAction<any>) => {
      const data = JSON.parse(localStorage?.getItem(likedItemsKey) || "[]");
      data.push(action.payload);
      localStorage.setItem(likedItemsKey, JSON.stringify(data));
      return data;
    },

    deleteFromFavorites: (state, action: PayloadAction<number>) => {
      let data = JSON.parse(localStorage?.getItem(likedItemsKey) || "[]");

      data = data.filter((item: any) => item.id !== action.payload);
      localStorage.setItem(likedItemsKey, JSON.stringify(data));
      return data;
    },
  },
});

export const favoritesReducer = favoritesSlice.reducer;

export const { fetchFavorites, addToFavorites, deleteFromFavorites } =
  favoritesSlice.actions;
