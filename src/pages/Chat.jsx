import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import { fetchChatsWithId, fetchQuery } from "../api/ClientAPI";
import Attachments from "../components/Attachments";

export default function Chat() {
  const { chatId } = useParams();

  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const [attachment, setAttachment] = useState(null);

  const onClickSend = async () => {
    if (!query.trim() && !attachment) return;

    const tempId = Date.now();
    const userQuery = query;

    setChats((prev) => [
      ...prev,
      {
        id: tempId,
        question: userQuery,
        attachment,
        answer: "",
        status: "pending",
      },
    ]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setQuery("");
    setAttachment(null);

    try {
      const {file} = attachment;
      const { success } = await fetchQuery(userQuery, chatId, file);

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
        {chats?.map((chat) => (
          <div key={chat.id} className="mb-4 space-y-2">
            {/* USER MESSAGE */}
            <div className="chat chat-end">
              {chat.attachment && (
                <img
                  src={chat.attachment.preview}
                  alt="attachment"
                  className="rounded-lg h-20 border"
                />
              )}
              {chat.question && (
                <div className="chat-bubble">{chat.question}</div>
              )}
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

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 sticky bottom-0 bg-base-100">
        <div className="relative flex items-end gap-2 bg-base-200 rounded-2xl px-3 py-1">
          {/* Attachment button */}
          <Attachments onSelectFile={setAttachment} />

          {/* Textarea container */}
          <div className="relative flex-1">
            {/* Image preview INSIDE textarea */}
            {attachment && (
              <div className="absolute left-2 top-1.5 flex items-center gap-1 z-10">
                <img
                  src={attachment.preview}
                  alt="preview"
                  className="h-10 w-10 rounded-lg border object-cover"
                />
                <button
                  onClick={() => setAttachment(null)}
                  className="btn btn-xs btn-circle absolute -top-2 -right-2"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Textarea */}
            <textarea
              placeholder="Ask anything..."
              ref={textareaRef}
              rows={1}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onClickSend();
                }
              }}
              className={`w-full resize-none bg-transparent outline-none leading-6 px-2 py-3 overflow-y-auto max-h-48
          ${attachment ? "pl-14" : ""}`}
            />
          </div>

          {/* Send button */}
          <button
            onClick={onClickSend}
            disabled={!query.trim() && !attachment}
            className="btn btn-primary rounded-4xl mb-2"
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
