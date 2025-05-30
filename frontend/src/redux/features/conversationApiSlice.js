import { apiSlice } from "../services/apiSlice";

const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createNewConversation: builder.mutation({
      query: (user) => ({
        url: "/conversation/new-conversation/",
        method: "POST",
        body: { user },
      }),
    }),
    getConversationsByUser: builder.query({
      query: (user) =>
        `/conversation/get-user-conversations?user=${encodeURIComponent(user)}`,
    }),
  }),
});

export const {
  useCreateNewConversationMutation,
  useGetConversationsByUserQuery,
} = conversationApiSlice;
