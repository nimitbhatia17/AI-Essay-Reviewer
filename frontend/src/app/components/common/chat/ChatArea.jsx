"use client";

import { useState, useRef, useEffect } from "react";
import {
  useGetChatsByConversationQuery,
  useInsertChatMutation,
} from "@/redux/features/chatApiSlice";
import { HiOutlineBars3, HiPaperAirplane, HiStop } from "react-icons/hi2";
import { HiUser } from "react-icons/hi";
import { RiRobot2Line } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ChatArea({ onToggleSidebar, activeConversation }) {
  const { data: messages, refetch } =
    useGetChatsByConversationQuery(activeConversation);
  const [insertChat, { isLoading: isTyping }] = useInsertChatMutation();
  const [inputValue, setInputValue] = useState("");
  const [userMessage, setUserMessage] = useState({});
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const conversation_id = activeConversation;
    const prompt = inputValue.trim();

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    setUserMessage(userMessage);
    setInputValue("");
    insertChat({ conversation_id, prompt })
      .unwrap()
      .then(() => refetch())
      .catch(() => toast.error("failed to connect to AI"));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="flex flex-col h-full bg-gray-200 font-sans">
      <div className="flex items-center justify-between p-4 border-b border-gray-900 bg-gray-900 font-sans">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <HiOutlineBars3 size={20} />
          </button>
          <h1 className="text-sm py-1 font-extrabold text-gray-200">
            AI ASSISTANT
          </h1>
        </div>
        <div className="text-sm text-gray-400">
          Conversation #{activeConversation}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden mt-4">
        <div
          className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 
                      scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
        >
          <div className="max-w-4xl mx-auto p-4 space-y-6">
            {messages?.map((message) => (
              <div
                key={message.pk}
                className={`flex gap-4 ${
                  message.fields?.is_ai ? "justify-start" : "justify-end"
                }`}
              >
                {message.fields?.is_ai && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <RiRobot2Line size={18} className="text-gray-100" />
                  </div>
                )}

                <div
                  className={`
                  max-w-3xl px-4 py-3 rounded-lg
                  ${
                    !message.fields?.is_ai
                      ? "bg-gray-100 text-gray-900 rounded-br-xs"
                      : "bg-gray-900 text-gray-100 rounded-bl-xs"
                  }
                `}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {message.fields?.text}
                  </p>
                  <div
                    className={`
                    text-xs mt-2 opacity-70
                    ${
                      !message.fields?.is_ai ? "text-gray-700" : "text-gray-300"
                    }
                  `}
                  >
                    {new Date(message.fields?.created_at).toLocaleTimeString()}
                  </div>
                </div>

                {!message.fields?.is_ai && (
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                    <HiUser size={18} className="text-gray-100" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-4 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center">
                  <RiRobot2Line size={18} className="text-white" />
                </div>
                <div className="bg-gray-700 text-white px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex space-x-1">
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
        </div>
      </div>

      <div className="border-t border-gray-700 bg-gray-900 p-4 px-6">
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className="relative flex items-end gap-3 bg-gray-700 p-3">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isTyping ? "AI is thinking..." : "Type your message..."
              }
              disabled={isTyping}
              className="flex-1 bg-transparent text-gray-100 placeholder-gray-400 
                       resize-none outline-none min-h-[24px] max-h-[200px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
              rows="1"
            />

            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`
                flex-shrink-0 p-2 rounded-xl transition-all duration-200
                ${
                  !inputValue.trim() || isTyping
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700 transform active:scale-95"
                }
              `}
            >
              {isTyping ? <HiStop size={20} /> : <HiPaperAirplane size={20} />}
            </button>
          </div>

          <div className="text-xs text-gray-400 text-center mt-2">
            Press Enter to send, Shift+Enter for new line
          </div>
        </form>
      </div>
    </div>
  );
}
