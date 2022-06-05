import { createAsyncThunk } from "@reduxjs/toolkit";
import { searchQueryGql } from "../../../services/query/searchQuery";
import { ISearchQueryParams } from "../../../ts/interfaces/search.interface";

export const searchListThunk = createAsyncThunk(
  "searchListThunk",
  async (variables: ISearchQueryParams, thunkAPI) => {
    try {
      var url = "https://graphql.anilist.co";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: searchQueryGql,
          variables,
        }),
      };

      const { data } = await (await fetch(url, options)).json();
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.data.status);
    }
  }
);
