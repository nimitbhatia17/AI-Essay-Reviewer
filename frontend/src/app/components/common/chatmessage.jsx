import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ChatMessage({ message, isUser }) {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 px-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg p-3 ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {isUser ? (
          <p>{message}</p>
        ) : (
          <ReactMarkdown
            I
            remarkPlugins={[remarkGfm]}
            components={{
              ul: ({ children }) => (
                <ul className="list-disc pl-4">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-4">{children}</ol>
              ),
              a: ({ href, children }) => (
                <a href={href} className="text-blue-600 hover:underline">
                  {children}
                </a>
              ),
            }}
          >
            {message}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
