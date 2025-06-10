import { apiSlice } from "../services/apiSlice";

const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatsByConversation: builder.query({
      query: (conversation_id) =>
        `/chat/get-chats?conversation_id=${encodeURIComponent(
          conversation_id
        )}`,
    }),
    insertChat: builder.mutation({
      query: ({ conversation_id, prompt }) => ({
        url: "/chat/insert-chat/",
        method: "POST",
        body: { conversation_id, prompt },
      }),
    }),
  }),
});

export const { useGetChatsByConversationQuery, useInsertChatMutation } =
  chatApiSlice;
