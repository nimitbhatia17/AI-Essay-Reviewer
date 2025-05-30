"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { ChatSidebar as Sidebar, ChatArea } from "@/app/components/common";
import {
  useGetConversationsByUserQuery,
  useCreateNewConversationMutation,
} from "@/redux/features/conversationApiSlice";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userId } = useSelector((state) => state.auth);
  const {
    data: conversations,
    isLoading,
    isFetching,
    isError,
  } = useGetConversationsByUserQuery(userId);
  const [createNewConversation] = useCreateNewConversationMutation();

  const [activeConversation, setActiveConversation] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const createNewChat = () => {
    createNewConversation(userId)
      .unwrap()
      .then((result) => {
        conversations = [...conversations, result];
        setActiveConversation(result?.pk);
      });
  };

  const deleteConversation = (id) => {
    // setConversations(conversations.filter((c) => c.id !== id));
    // if (activeConversation === id && conversations.length > 1) {
    //   const remaining = conversations.filter((c) => c.id !== id);
    //   setActiveConversation(remaining[0]?.id);
    // }
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
        onDeleteConversation={deleteConversation}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
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
