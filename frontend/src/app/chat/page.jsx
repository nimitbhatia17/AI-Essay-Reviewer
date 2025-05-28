"use client";

import React, { useState, useRef, useEffect } from "react";
import { GoPlus } from "react-icons/go";
import { RiMessageLine } from "react-icons/ri";
import { FiTrash } from "react-icons/fi";
import { IoCreateOutline, IoSendSharp, IoMenuSharp } from "react-icons/io5";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [chats, setChats] = useState([
    {
      id: 1,
      title: "React Components Discussion",
      timestamp: "2 hours ago",
      active: true,
    },
    {
      id: 2,
      title: "API Integration Help",
      timestamp: "1 day ago",
      active: false,
    },
    {
      id: 3,
      title: "CSS Styling Questions",
      timestamp: "3 days ago",
      active: false,
    },
    {
      id: 4,
      title: "Database Design Patterns",
      timestamp: "1 week ago",
      active: false,
    },
    {
      id: 5,
      title: "Performance Optimization Tips",
      timestamp: "2 weeks ago",
      active: false,
    },
    {
      id: 6,
      title: "State Management in React",
      timestamp: "2 weeks ago",
      active: false,
    },
    {
      id: 7,
      title: "NextJS App Router Guide",
      timestamp: "3 weeks ago",
      active: false,
    },
    {
      id: 8,
      title: "TypeScript Best Practices",
      timestamp: "1 month ago",
      active: false,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: 2,
      content:
        "I'm working on a React component and need some help with state management.",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: 3,
      content:
        "I'd be happy to help you with React state management! What specific challenge are you facing? Are you working with useState, useReducer, or perhaps a more complex state management solution like Redux or Zustand?",
      isUser: false,
      timestamp: new Date(),
    },
    {
      id: 4,
      content:
        "I'm using useState but I'm having trouble sharing state between components.",
      isUser: true,
      timestamp: new Date(),
    },
    {
      id: 5,
      content:
        "That's a common challenge! There are several approaches you can take:\n\n1. **Lift State Up**: Move the state to a common parent component\n2. **Context API**: For deeper component trees\n3. **Custom Hooks**: For reusable state logic\n\nWhich approach would you like to explore first?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNewChat = () => {
    const newChat = {
      id: chats.length + 1,
      title: "New Chat",
      timestamp: "Just now",
      active: false,
    };
    setChats([newChat, ...chats.map((chat) => ({ ...chat, active: false }))]);
    setMessages([
      {
        id: 1,
        content: "Hello! How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };

  const handleChatSelect = (chatId) => {
    setChats(
      chats.map((chat) => ({
        ...chat,
        active: chat.id === chatId,
      }))
    );
    // Load different messages for different chats (mock data)
    if (chatId === 2) {
      setMessages([
        {
          id: 1,
          content: "I need help with API integration.",
          isUser: true,
          timestamp: new Date(),
        },
        {
          id: 2,
          content:
            "I'd be happy to help with API integration! What kind of API are you working with?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } else {
      setMessages([
        {
          id: 1,
          content: "Hello! How can I help you today?",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
    // On mobile, close sidebar after selecting a chat
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    setChats(chats.filter((chat) => chat.id !== chatId));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        content:
          "That's a great question! Let me help you with that. This is a simulated response to demonstrate the chat functionality.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden bg-gray-100">
      <div className="flex h-full">
        {/* Mobile Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
          bg-gray-900 text-white transition-all duration-300 ease-in-out flex-shrink-0
          ${isSidebarOpen ? "w-80" : "w-0 md:w-16"}
          ${isSidebarOpen ? "block" : "hidden md:block"}
          md:relative
          ${!isSidebarOpen ? "md:block" : ""}
        `}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 flex-shrink-0">
              {(isSidebarOpen || window.innerWidth >= 768) && (
                <>
                  {isSidebarOpen && (
                    <h1 className="text-lg font-semibold">Chat History</h1>
                  )}
                  <button
                    onClick={toggleSidebar}
                    className={`p-2 hover:bg-gray-700 rounded-lg transition-colors ${
                      !isSidebarOpen ? "mx-auto" : "md:ml-auto"
                    }`}
                  >
                    {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
                  </button>
                </>
              )}
            </div>

            {/* New Chat Button */}
            {isSidebarOpen && (
              <div className="p-4 border-b border-gray-700 flex-shrink-0">
                <button
                  onClick={handleNewChat}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-left"
                >
                  <GoPlus />
                  <span>New Chat</span>
                </button>
              </div>
            )}

            {/* Chat List - Scrollable */}
            <div className="flex-1 overflow-hidden">
              {isSidebarOpen ? (
                <div className="h-full overflow-y-auto p-4 space-y-2">
                  {chats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className={`
                        group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all
                        ${
                          chat.active
                            ? "bg-gray-700 border-l-4 border-blue-500"
                            : "hover:bg-gray-800"
                        }
                      `}
                    >
                      <RiMessageLine
                        size={16}
                        className="mt-0.5 text-gray-400 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`
                            text-sm font-medium truncate
                            ${chat.active ? "text-white" : "text-gray-200"}
                          `}
                          >
                            {chat.title}
                          </h3>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle edit functionality
                              }}
                              className="p-1 hover:bg-gray-600 rounded"
                            >
                              <IoCreateOutline />
                            </button>
                            <button
                              onClick={(e) => handleDeleteChat(chat.id, e)}
                              className="p-1 hover:bg-red-600 rounded text-red-400 hover:text-white"
                            >
                              <FiTrash />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          {chat.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="hidden md:flex flex-col items-center py-4 space-y-4 h-full overflow-y-auto">
                  {chats.slice(0, 5).map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                      className={`
                        p-2 rounded-lg transition-colors
                        ${chat.active ? "bg-gray-700" : "hover:bg-gray-800"}
                      `}
                      title={chat.title}
                    >
                      <RiMessageLine size={20} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {isSidebarOpen && (
              <div className="p-4 border-t border-gray-700 flex-shrink-0">
                <div className="text-xs text-gray-400 text-center">
                  <p>Chatbot Assistant</p>
                  <p>Version 1.0</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Mobile menu button */}
          {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="md:hidden absolute top-4 left-4 z-30 p-2 bg-gray-900 text-white rounded-lg"
            >
              <IoMenuSharp />
            </button>
          )}

          {/* Chat Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoMenuSharp />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">
                {chats.find((chat) => chat.active)?.title || "Chat"}
              </h2>
            </div>
            <div className="text-sm text-gray-500">AI Assistant</div>
          </div>

          {/* Messages Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`
                  max-w-[70%] rounded-lg p-4 ${
                    message.isUser
                      ? "bg-blue-600 text-white"
                      : "bg-white border border-gray-200 text-gray-800"
                  }
                `}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div
                    className={`
                    text-xs mt-2 ${
                      message.isUser ? "text-blue-100" : "text-gray-500"
                    }
                  `}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-[70%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isTyping}
                />
              </div>
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`
                  px-4 py-3 rounded-lg transition-colors flex items-center justify-center
                  ${
                    !inputMessage.trim() || isTyping
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }
                `}
              >
                <IoSendSharp />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
