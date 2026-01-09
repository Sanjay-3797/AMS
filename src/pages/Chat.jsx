import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { marked } from "marked";
import { fetchChatsWithId, fetchQuery } from "../api/ClientAPI";

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
              <div className="chat-bubble">{chat.question}</div>
            </div>

            {/* AI MESSAGE */}
            <div className="chat chat-start w-[70%] ">
              <div
                className={`chat-bubble chat-bubble-primary overflow-x-auto ${
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
        {/* Input wrapper */}
        <div className="relative flex items-end gap-2 bg-base-200 rounded-2xl px-3 py-2">
          {/* Add Doc / Attach button */}
          <button
            type="button"
            className="btn btn-ghost rounded-md hover:bg-base-300"
            title="Attach document"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-5"
            >
              <path d="M21.44 11.05l-8.49 8.49a6 6 0 0 1-8.49-8.49l8.49-8.49a4 4 0 0 1 5.66 5.66l-8.49 8.49a2 2 0 0 1-2.83-2.83l7.78-7.78" />
            </svg>
          </button>

          {/* Textarea */}
          <textarea
            placeholder="Ask anything..."
            rows={1}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onClickSend();
              }
            }}
            className="flex-1 resize-none bg-transparent outline-none leading-6 px-2 py-2 overflow-y-auto"
          />

          {/* Send button */}
          <button
            onClick={onClickSend}
            disabled={!query.trim()}
            className=" btn btn-primary rounded-4xl"
            title="Send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
