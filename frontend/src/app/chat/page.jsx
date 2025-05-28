"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "user", content: "Hello, who are you?" },
    {
      id: 2,
      role: "assistant",
      content: "I'm ChatGPT, your AI assistant. How can I help you today?",
    },
    { id: 3, role: "user", content: "Can you help me write a resume?" },
    {
      id: 4,
      role: "assistant",
      content: "Sure! Let me guide you through the process.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Conversation 1",
    "Conversation 2",
    "Conversation 3",
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { id: Date.now(), role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "assistant", content: "This is a response." },
      ]);
    }, 500);
  };

  return (
    <div className="flex h-screen flex-col md:flex-row bg-gray-100 text-gray-900 overflow-hidden">
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-semibold">Chat</h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-blue-500 font-medium"
        >
          {sidebarOpen ? "Close" : "History"}
        </button>
      </div>

      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-white border-r border-gray-200 p-4 flex flex-col md:h-full md:static absolute z-10`}
      >
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="flex-1 overflow-y-auto space-y-2 max-h-full">
          {history.map((item, index) => (
            <div
              key={index}
              className="p-2 rounded hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </div>
          ))}
        </div>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          New Chat
        </button>
      </aside>

      <main className="flex-1 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xl px-4 py-2 rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-200 self-start mr-auto"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t bg-white sticky bottom-0">
          <div className="flex items-center gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded px-3 py-2 min-h-[40px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
