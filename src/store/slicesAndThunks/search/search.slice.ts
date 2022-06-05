import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchListThunk } from "./search.thunk";

const initialData = {
  pageInfo: {
    total: 0,
    currentPage: 0,
    lastPage: 0,
    hasNextPage: false,
    perPage: 0,
  },
  media: [] as any[],
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialData,
  reducers: {
    clearSearchData: () => {
      return initialData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      searchListThunk.fulfilled,
      (state, action: PayloadAction<any>) => {
        const mediaList = action.payload?.Page?.media;
        state = {
          ...action.payload?.Page,
          media: [...state.media, ...mediaList],
        };

        return state;
      }
    );
  },
});

export const searchReducer = searchSlice.reducer;

export const { clearSearchData } = searchSlice.actions;
