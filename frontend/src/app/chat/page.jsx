"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ChatSidebar as Sidebar, ChatArea } from "@/app/components/common";
import {
  useGetConversationsByUserQuery,
  useCreateNewConversationMutation,
  useDeleteConversationMutation,
} from "@/redux/features/conversationApiSlice";
import { toast } from "react-toastify";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userId: user } = useSelector((state) => state.auth);
  const {
    data: conversations,
    refetch,
    isLoading,
    isFetching,
    isError,
  } = useGetConversationsByUserQuery(user);
  const [deleteConversation] = useDeleteConversationMutation();
  const [createNewConversation] = useCreateNewConversationMutation();

  const [activeConversation, setActiveConversation] = useState(
    conversations ? conversations[0].fields?.pk : null
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const createNewChat = () => {
    createNewConversation(user)
      .unwrap()
      .then((result) => {
        refetch();
        setActiveConversation(result?.pk);
      });
  };

  const deleteAConversation = (conversation_id) => {
    deleteConversation(conversation_id)
      .unwrap()
      .then(() => {
        toast.success("Conversation Deleted Successully!");
        refetch();
      })
      .catch(() => {
        toast.error("Failed Delete");
      });
    setActiveConversation(conversations ? conversations[0].fields?.pk : null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={setActiveConversation}
        onNewChat={createNewChat}
        onDeleteConversation={deleteAConversation}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
          user={user}
          onToggleSidebar={toggleSidebar}
          activeConversation={activeConversation}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
