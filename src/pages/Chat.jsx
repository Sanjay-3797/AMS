import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { fetchChatsWithId, fetchQuery } from "../api/auth";

export default function Chat() {
  const { chatId } = useParams();

  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const onClickSend = async () => {
    if (!query.trim()) return;

    const tempId = Date.now();
    const userQuery = query;

    setChats((prev) => [
      ...prev,
      {
        id: tempId,
        question: userQuery,
        answer: "",
        status: "pending",
      },
    ]);

    setQuery("");

    try {
      const { success } = await fetchQuery(userQuery, chatId);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? {
                ...chat,
                answer:
                  typeof success?.model_response === "string"
                    ? success.model_response
                    : "",
                status: "done",
              }
            : chat
        )
      );
    } catch (err) {
      console.log("Error fetching query:", err);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === tempId
            ? {
                ...chat,
                answer: "❌ Failed to get response",
                status: "error",
              }
            : chat
        )
      );
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const result = await fetchChatsWithId(chatId);

        const normalized = Array.isArray(result)
          ? result.map((item, index) => {
              const entry = Object.entries(item || {})[0] || [];
              const question = entry[0] ?? "";
              const answer = entry[1] ?? "";

              return {
                id: index + Date.now(),
                question,
                answer: typeof answer === "string" ? answer : "",
                status: "done",
              };
            })
          : [];

        setChats(normalized);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [chatId]);

  if (loading) {
    return (
      <div className="p-4 h-screen flex items-center justify-center">
        Loading chats...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">Error fetching chats: {error}</div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {chats.map((chat) => (
          <div key={chat.id} className="mb-4 space-y-2">
            {/* USER MESSAGE */}
            <div className="chat chat-end">
              <div className=" chat-bubble">{chat.question}</div>
            </div>

            {/* AI MESSAGE */}
            <div className="chat chat-start w-[70%] whitespace-pre-wrap">
              <div
                className={`chat-bubble chat-bubble-primary ${
                  chat.status === "pending"
                    ? "loading loading-dots loading-xl text-warning"
                    : ""
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    chat.status === "pending" ? "" : marked.parse(chat.answer),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 sticky bottom-0 bg-base-100">
        <textarea
          placeholder="Ask anything..."
          className="w-full textarea textarea-xl pr-20 rounded-2xl"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onClickSend();
            }
          }}
        />

        <button
          className="btn btn-primary absolute bottom-6 right-5 rounded-2xl"
          onClick={onClickSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
