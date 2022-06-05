import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ISearchQueryParams,
  IMediaData,
} from "../ts/interfaces/search.interface";

const baseUrl = "https://graphql.anilist.co";

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Search"],
  endpoints: (build) => ({
    searchData: build.query<IMediaData, ISearchQueryParams>({
      query: (params) => ({
        url: "/",
        method: "POST",
        body: params,
      }),
    }),
  }),
});
