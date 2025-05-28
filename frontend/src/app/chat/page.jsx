"use client";

// pages/chat.js or app/chat/page.js
import { useState } from "react";
import { ChatSidebar as Sidebar, ChatArea } from "@/app/components/common";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [conversations, setConversations] = useState([
    { id: 1, title: "Getting started with AI", timestamp: "2 hours ago" },
    { id: 2, title: "React best practices discussion", timestamp: "1 day ago" },
    { id: 3, title: "Help with JavaScript arrays", timestamp: "3 days ago" },
    { id: 4, title: "CSS Grid vs Flexbox comparison", timestamp: "1 week ago" },
    { id: 5, title: "Database design questions", timestamp: "2 weeks ago" },
    { id: 6, title: "API integration help", timestamp: "3 weeks ago" },
    {
      id: 7,
      title: "Testing strategies for frontend",
      timestamp: "1 month ago",
    },
    { id: 8, title: "Performance optimization tips", timestamp: "1 month ago" },
  ]);
  const [activeConversation, setActiveConversation] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const createNewChat = () => {
    const newId = Math.max(...conversations.map((c) => c.id)) + 1;
    const newConversation = {
      id: newId,
      title: "New conversation",
      timestamp: "now",
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversation(newId);
  };

  const deleteConversation = (id) => {
    setConversations(conversations.filter((c) => c.id !== id));
    if (activeConversation === id && conversations.length > 1) {
      const remaining = conversations.filter((c) => c.id !== id);
      setActiveConversation(remaining[0]?.id);
    }
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

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatArea
          onToggleSidebar={toggleSidebar}
          activeConversation={activeConversation}
        />
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
