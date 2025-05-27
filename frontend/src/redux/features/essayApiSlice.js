import { apiSlice } from "../services/apiSlice";

const essayApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    essaySearch: builder.mutation({
      query: (query) => ({
        url: "/essays/search/",
        method: "POST",
        body: { query },
      }),
    }),
    getEssayById: builder.query({
      query: (id) => `/essay/get?id=${id}`,
    }),
  }),
});

export const { useEssaySearchMutation, useGetEssayByIdQuery } = essayApiSlice;
