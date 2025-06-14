"use client";

import { useState, useRef, useEffect } from "react";
import {
  useGetChatsByConversationQuery,
  useInsertChatMutation,
} from "@/redux/features/chatApiSlice";
import { HiPaperAirplane, HiStop } from "react-icons/hi2";
import { toast } from "react-toastify";

export default function ChatArea({ onToggleSidebar, activeConversation }) {
  const { data: messages, refetch } =
    useGetChatsByConversationQuery(activeConversation);
  const [insertChat, { isLoading: isTyping }] = useInsertChatMutation();
  const [inputValue, setInputValue] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setUserMessage("");
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
      .then(() => {
        refetch().then(() => setUserMessage(""));
      })
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
    <div className="flex flex-col h-full font-poppins">
      <div className="flex-1 overflow-hidden mt-4">
        <div
          className="mx-40 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 
                      scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
        >
          {!activeConversation && (
            <div className="z-100 justify-center items-center flex flex-col h-full space-y-4 text-gray-300 text-lg">
              Start a new Conversation
            </div>
          )}

          {activeConversation && (
            <div className="w-full mx-auto space-y-6 text-lg">
              {messages?.map((message) => (
                <div
                  key={message.pk}
                  className={`flex gap-4 ${
                    message.fields?.is_ai ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-4 py-4 rounded-lg
                  ${
                    !message.fields?.is_ai
                      ? "bg-gray-100 text-gray-800"
                      : "text-gray-800"
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
                      !message.fields?.is_ai ? "text-gray-500" : "text-gray-500"
                    }
                  `}
                    >
                      {new Date(
                        message.fields?.created_at
                      ).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}

              {userMessage && (
                <div key="userMessage" className="flex gap-4 justify-end">
                  <div className="bg-gray-100 text-gray-800 px-4 py-4 rounded-lg">
                    <p className="whitespace-pre-wrap break-words">
                      {userMessage.content}
                    </p>
                    <div className="text-xs mt-2 opacity-70 text-gray-500">
                      {new Date(userMessage.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              )}

              {isTyping && (
                <div className="flex gap-4 justify-start">
                  <div className="bg-gray-200 text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-1 h-1 bg-gray-800 rounded-full animate-bounce"></div>
                      <div
                        className="w-1 h-1 bg-gray-800 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-1 h-1 bg-gray-800 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {activeConversation && (
        <>
          <div className="bg-gray-100 lg:mx-40 rounded-md border-1 border-gray-300">
            <form onSubmit={handleSubmit} className="mx-auto">
              <div className="relative flex items-center gap-3 p-3">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isTyping ? "AI is thinking..." : "Ask anything"}
                  disabled={isTyping}
                  className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 text-lg p-3 font-medium
                       resize-none outline-none min-h-[24px] max-h-[200px] scrollbar-thin scrollbar-thumb-gray-500 
                       scrollbar-track-transparent"
                  rows="1"
                />

                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className={`
                p-2 rounded-md transition-all duration-600
                ${
                  !inputValue.trim() || isTyping
                    ? "bg-gray-300 text-gray-200 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700 transform active:scale-95"
                }
              `}
                >
                  {isTyping ? (
                    <HiStop size={26} />
                  ) : (
                    <HiPaperAirplane size={26} />
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="text-xs text-gray-400 text-center p-2 font-poppins">
            MBA Assistant can make mistakes. Check important info. (Press Enter
            to send, Shift+Enter for new line)
          </div>
        </>
      )}
    </div>
  );
}
