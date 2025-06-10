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
    deleteConversation: builder.mutation({
      query: (conversation_id) => ({
        url: "/conversation/delete-conversation/",
        method: "POST",
        body: { conversation_id },
      }),
    }),
  }),
});

export const {
  useCreateNewConversationMutation,
  useGetConversationsByUserQuery,
  useDeleteConversationMutation,
} = conversationApiSlice;
