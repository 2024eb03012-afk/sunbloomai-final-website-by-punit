"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const WEBHOOK_URL =
  "https://n8n.zenquill.tech/webhook/039cf66c-8c9f-4134-bd5f-d1da2fdee73e/chat";

const PREBUILT_PROMPTS = [
  {
    label: "What can you build?",
    prompt: "What can you build for my business?",
  },
  {
    label: "Voice agent use-cases",
    prompt: "Show me voice agent use-cases",
  },
  {
    label: "Estimate ROI",
    prompt: "Estimate ROI for AI agents",
  },
  {
    label: "Book a call",
    prompt: "I'd like to book a strategy call",
  },
];

function createId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: createId(),
      role: "assistant",
      content:
        "Hey! 👋 I'm the SunbloomAI assistant. Ask me anything about AI agents, voicebots, or how we can help your business.",
      timestamp: new Date(),
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  const canSend = useMemo(
    () => !!input.trim() && !isSending,
    [input, isSending]
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isSending) return;

      setIsSending(true);
      setError(null);

      const userMsg: ChatMessage = {
        id: createId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");

      try {
        // Prepare history for the webhook
        const history = messages
          .filter((m) => m.role !== "assistant" || m.content !== messages[0].content)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        // Use the standard n8n webhook format
        // Based on n8n docs, webhooks typically expect the data in the request body
        const payload = {
          message: trimmed,
          chatInput: trimmed, // Some n8n workflows use this
          history: history.length > 0 ? history : [],
        };

        let response: Response;
        let rawText: string;

        try {
          response = await fetch(WEBHOOK_URL, {
            method: "POST",
            mode: "cors",
            credentials: "omit",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorText = await response.text().catch(() => response.statusText);
            throw new Error(
              `HTTP ${response.status}: ${response.statusText}. ${errorText ? `Response: ${errorText}` : ""}`
            );
          }

          rawText = await response.text();
        } catch (err) {
          const error = err instanceof Error ? err : new Error(String(err));
          const errorMsg = error.message.toLowerCase();

          // Detect CORS errors
          if (
            errorMsg.includes("failed to fetch") ||
            errorMsg.includes("cors") ||
            errorMsg.includes("networkerror") ||
            errorMsg.includes("network error")
          ) {
            throw new Error(
              "❌ CORS Error: Your n8n webhook is blocking requests from this website.\n\n" +
              "To fix this, you need to configure CORS in your n8n workflow:\n" +
              "1. Open your n8n workflow\n" +
              "2. Click on the Webhook node\n" +
              "3. Enable 'CORS' option\n" +
              "4. Or add your domain to allowed origins\n" +
              "5. Make sure the workflow is ACTIVE\n\n" +
              "Alternatively, test the webhook directly:\n" +
              `curl -X POST ${WEBHOOK_URL} -H "Content-Type: application/json" -d '{"message":"test"}'`
            );
          }

          // Detect network errors
          if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
            throw new Error(
              `Network Error: Unable to reach the webhook.\n\n` +
              `Please check:\n` +
              `1. Is the webhook URL correct?\n` +
              `2. Is your n8n workflow ACTIVE?\n` +
              `3. Is the server running?\n\n` +
              `Webhook URL: ${WEBHOOK_URL}`
            );
          }

          throw error;
        }

        let replyText = rawText;

        // Try to parse as JSON
        try {
          const json = JSON.parse(rawText);
          replyText =
            json.reply ||
            json.message ||
            json.text ||
            json.response ||
            json.answer ||
            json.output ||
            json.data ||
            JSON.stringify(json, null, 2);
        } catch {
          // Not JSON, use raw text
        }

        const assistantMsg: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: String(replyText).trim() || "I'm here, but I didn't receive a response. Please try again.",
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        console.error("Chat error:", err);
        const errorMsg =
          err instanceof Error
            ? err.message
            : "Failed to get response. Please check your connection and try again.";

        setError(errorMsg);

        // Format error message for display
        const formattedError = errorMsg.includes("\n")
          ? errorMsg.split("\n").map((line, i) => (i === 0 ? `❌ ${line}` : line)).join("\n")
          : `❌ ${errorMsg}`;

        const errorAssistantMsg: ChatMessage = {
          id: createId(),
          role: "assistant",
          content: formattedError,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, errorAssistantMsg]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending, messages]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!canSend) return;
      void sendMessage(input);
    },
    [canSend, sendMessage, input]
  );

  const handlePromptClick = useCallback(
    (prompt: string) => {
      setIsOpen(true);
      setTimeout(() => {
        void sendMessage(prompt);
      }, 100);
    },
    [sendMessage]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && canSend) {
        e.preventDefault();
        void sendMessage(input);
      }
    },
    [canSend, sendMessage, input]
  );

  // Auto-resize textarea
  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      const scrollHeight = textarea.scrollHeight;
      const maxHeight = 128; // 8rem
      textarea.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    };

    adjustHeight();
    textarea.addEventListener("input", adjustHeight);
    return () => textarea.removeEventListener("input", adjustHeight);
  }, [input]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[340px] sm:w-[380px] lg:w-[420px] h-[580px] max-h-[calc(100vh-120px)] rounded-3xl border border-white/80 bg-gradient-to-b from-white/98 via-white/95 to-[#F7F5F0]/95 shadow-[0_20px_70px_rgba(15,23,42,0.4)] backdrop-blur-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-gradient-to-r from-[#FF9A76]/10 via-[#FFB6A3]/8 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm border border-black/5 overflow-hidden">
                  <Image 
                    src="/sunbloom-ai.png" 
                    alt="SunbloomAI Logo" 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#FF9A76]">
                    SunbloomAI
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    AI Assistant
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-white/80 text-sm text-muted-foreground hover:bg-[#FF9A76]/10 hover:text-[#FF9A76] hover:border-[#FF9A76]/30 transition-all"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gradient-to-b from-transparent to-[#F7F5F0]/30"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#111827] to-[#1F2937] text-white"
                        : "bg-white text-foreground border border-black/[0.06]"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isSending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-white border border-black/[0.06] px-4 py-3 flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#FF9A76] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#FF9A76] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-[#FF9A76] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-muted-foreground">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                  <p className="text-xs text-red-600 whitespace-pre-wrap break-words font-medium">
                    {error}
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Prebuilt Prompts */}
            {messages.length <= 1 && (
              <div className="px-4 pt-2 pb-2 border-t border-black/5 bg-white/50">
                <div className="flex flex-wrap gap-2">
                  {PREBUILT_PROMPTS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => handlePromptClick(p.prompt)}
                      disabled={isSending}
                      className="rounded-full border border-[#FF9A76]/30 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-[#FF9A76] hover:bg-[#FF9A76]/10 hover:border-[#FF9A76]/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-4 border-t border-black/5 bg-white/80"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-black/[0.08] bg-white/90 px-3 py-2.5 shadow-sm focus-within:border-[#FF9A76]/40 focus-within:shadow-md transition-all">
                <textarea
                  ref={inputRef}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none resize-none max-h-32 min-h-[24px] overflow-y-auto"
                  placeholder="Ask about AI agents, voicebots, ROI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isSending}
                  rows={1}
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all shrink-0 ${
                    canSend
                      ? "bg-gradient-to-r from-[#FF9A76] to-[#FFB6A3] text-white hover:shadow-lg hover:scale-105"
                      : "bg-black/[0.06] text-muted-foreground cursor-not-allowed"
                  }`}
                  aria-label="Send message"
                >
                  ➤
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-4 sm:right-6 z-40 inline-flex items-center gap-2.5 rounded-full px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_16px_48px_rgba(15,23,42,0.5)] bg-gradient-to-r from-[#111827] via-[#1F2937] to-[#374151] border border-white/20 hover:shadow-[0_20px_60px_rgba(15,23,42,0.65)] hover:scale-105 transition-all sm:px-5 sm:py-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        aria-label={isOpen ? "Hide SunbloomAI chat" : "Open SunbloomAI chat"}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white border border-white/30 shadow-sm overflow-hidden">
          <Image 
            src="/sunbloom-ai.png" 
            alt="SunbloomAI" 
            width={20} 
            height={20} 
            className="object-contain"
          />
        </span>
        <span>{isOpen ? "Hide chat" : "Ask the AI assistant"}</span>
      </motion.button>
    </>
  );
}
