import { HiPlus, HiTrash, HiX } from "react-icons/hi";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import moment from "moment/moment";

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
        className={`fixed lg:relative top-0 left-0 h-full bg-gray-100 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-100 flex flex-col`}
      >
        <div className="flex items-center justify-between border-gray-700">
          <button
            onClick={onToggle}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <HiX size={20} />
          </button>
        </div>

        <div className="p-4 border-b-2 border-gray-300">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-200 transition-colors duration-600 text-left text-gray-800 font-poppins text-md font-bold cursor-pointer"
          >
            <HiPlus size={22} />
            <span className="mt-1 font-extrabold">NEW CHAT</span>
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
            <div className="px-4 py-3 space-y-6">
              {conversations?.map((conversation) => (
                <div
                  key={conversation?.pk}
                  className={`
                    group flex items-center gap-3 p-3 cursor-pointer 
                    transition-all duration-600 hover:bg-gray-200 font-poppins font-light
                    ${
                      activeConversation === conversation?.pk
                        ? "border-l-2 border-gray-800"
                        : "hover:bg-gray-200"
                    }
                  `}
                  onClick={() => onSelectConversation(conversation?.pk)}
                >
                  <HiChatBubbleLeftRight
                    key={conversations?.pk}
                    size={22}
                    className="text-gray-800 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-md font-semibold text-gray-800 truncate">
                      {conversation?.fields?.title}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {moment(
                        new Date(conversation?.fields?.updated_at)
                      ).fromNow()}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDeleteConversation(conversation?.pk);
                    }}
                    className="p-1 transition-all duration-600"
                  >
                    <HiTrash
                      size={20}
                      className="text-gray-800 transition-all cursor-pointer duration-600 hover:text-red-600"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="text-center text-xs text-gray-400">
            AI Assistant v1.0
          </div>
        </div>
      </div>
    </>
  );
}
