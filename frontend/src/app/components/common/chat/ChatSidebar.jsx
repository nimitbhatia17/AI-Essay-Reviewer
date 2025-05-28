import { HiPlus, HiTrash, HiX } from "react-icons/hi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

export default function ChatSidebar({
  isOpen,
  onToggle,
  conversations,
  activeConversation,
  onSelectConversation,
  onNewChat,
  onDeleteConversation,
}) {
  return (
    <>
      <div
        className={`
        fixed lg:relative top-0 left-0 h-full border-r bg-gray-900 border-gray-700
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        w-80 lg:w-80 flex flex-col
      `}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-sm font-extrabold font-sans text-gray-200">
            RECENT CONVERSATIONS
          </h2>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 bg-gray-800 hover:bg-gray-500 transition-colors duration-200 text-left font-sans"
          >
            <HiPlus size={20} />
            <span className="font-bold font-sans">New Chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <div
            className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 
                        scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
          >
            <div className="px-4 pb-4 space-y-2">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`
                    group flex items-center gap-3 p-3 cursor-pointer 
                    transition-all duration-200 hover:bg-gray-500 font-sans font-light
                    ${
                      activeConversation === conversation.id
                        ? "bg-gray-700 border-l-4 border-gray-200"
                        : "hover:bg-gray-700"
                    }
                  `}
                  onClick={() => onSelectConversation(conversation.id)}
                >
                  <HiChatBubbleLeftRight
                    size={18}
                    className="text-gray-400 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-200 truncate">
                      {conversation.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {conversation.timestamp}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteConversation(conversation.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-600 
                             rounded transition-all duration-200 flex-shrink-0"
                  >
                    <HiTrash
                      size={16}
                      className="text-gray-400 hover:text-red-400"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-700">
          <div className="text-center text-xs text-gray-400">
            AI Assistant v1.0
          </div>
        </div>
      </div>
    </>
  );
}
