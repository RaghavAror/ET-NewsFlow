"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface Props {
  jobId: string;
}

const SUGGESTED_QUESTIONS = [
  "What is the key takeaway for investors?",
  "How does this affect the Nifty 50?",
  "What should I watch in the next 48 hours?",
  "Explain the regulatory implications",
];

export function ChatNavigator({ jobId }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "I've read this article in full. Ask me anything about the story — key facts, implications, or what it means for specific sectors.",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (question: string) => {
    if (!question.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: question,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_id: jobId, question }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer || "I couldn't find a specific answer in the article.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error. Please try again.",
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t border-zinc-800 mt-4">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-zinc-800">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
          Chat with this Story
        </span>
        <span className="text-xs text-zinc-600 ml-auto">AI-powered Q&A</span>
      </div>

      {/* Messages */}
      <div className="h-52 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed
              ${msg.role === "user"
                ? "bg-orange-500/20 text-orange-100 rounded-br-sm"
                : "bg-zinc-800 text-zinc-300 rounded-bl-sm"}`}>
              {msg.role === "assistant" && (
                <span className="text-orange-400 font-medium block mb-1 text-[10px] uppercase tracking-wide">
                  ET Navigator
                </span>
              )}
              {msg.content}
              <span className="block text-[10px] text-zinc-600 mt-1 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 rounded-xl px-3 py-2 flex gap-1 items-center">
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"
                     style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions */}
      <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-zinc-800/50">
        {SUGGESTED_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200
                       px-2.5 py-1 rounded-full whitespace-nowrap transition-colors border
                       border-zinc-700 flex-shrink-0 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2 px-4 py-3 border-t border-zinc-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Ask anything about this story..."
          disabled={loading}
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2
                     text-xs text-white placeholder:text-zinc-600 focus:outline-none
                     focus:ring-1 focus:ring-orange-500 disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="px-3 py-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50
                     text-white text-xs font-medium rounded-lg transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
}