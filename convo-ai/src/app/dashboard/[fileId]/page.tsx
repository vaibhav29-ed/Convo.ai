"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ChatMessage from "@/components/ui/ChatMessage";
import ChatInput from "@/components/ui/ChatInput";
import Button from "@/components/ui/Button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const fileId = params.fileId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [pdfNotFound, setPdfNotFound] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchMessages();
    }
  }, [session, fileId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/chat?pdfId=${fileId}`);
      if (res.status === 404) {
        setPdfNotFound(true);
        return;
      }
      const data = await res.json();
      setMessages(data.messages || []);
    } catch {
      setPdfNotFound(true);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: message,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, pdfId: fileId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error processing your request. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to get response");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading" || loadingMessages) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-brand-600 border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (pdfNotFound) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Document not found
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              This document may have been deleted or you don&apos;t have access.
            </p>
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1 flex pt-16">
        <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/dashboard")}
              >
                <svg
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Chat with PDF</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask anything about this document</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.length === 0 && !isLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="h-16 w-16 rounded-2xl bg-brand-100 flex items-center justify-center mb-4">
                  <svg
                    className="h-8 w-8 text-brand-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Start a conversation
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                  Ask questions about this document. You can ask about key concepts, summaries,
                  specific details, or anything else in the PDF.
                </p>
                <div className="flex flex-wrap gap-2 mt-6 justify-center">
                  {[
                    "What is this document about?",
                    "Summarize the main points",
                    "What are the key findings?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSendMessage(suggestion)}
                      className="px-4 py-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 hover:border-brand-300 hover:bg-brand-50 dark:hover:bg-brand-950 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                    createdAt={msg.createdAt}
                  />
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300 shrink-0">
                      AI
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
              AI responses are based on the content of your uploaded document.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
