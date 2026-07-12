"use client";

import ReactMarkdown from "react-markdown";
import Avatar from "./Avatar";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  createdAt?: string;
}

export default function ChatMessage({
  role,
  content,
  createdAt,
}: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <Avatar
        fallback={isUser ? "You" : "AI"}
        size="sm"
        className={isUser ? "bg-brand-100 text-brand-700" : "bg-muted text-muted-foreground"}
      />
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-brand-600 text-white rounded-tr-sm"
            : "bg-muted text-foreground rounded-tl-sm"
        }`}
      >
        <div className={`text-sm leading-relaxed ${isUser ? "prose-invert" : "prose prose-sm max-w-none"}`}>
          {isUser ? (
            <p>{content}</p>
          ) : (
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                code: ({ children, className }) => (
                  <code className={`px-1 py-0.5 rounded bg-accent text-accent-foreground text-xs ${className || ""}`}>
                    {children}
                  </code>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          )}
        </div>
        {createdAt && (
          <p
            className={`text-xs mt-1 ${
              isUser ? "text-brand-200" : "text-muted-foreground"
            }`}
          >
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
}
