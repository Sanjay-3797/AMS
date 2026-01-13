import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { marked } from "marked";
import { fetchChatsWithId, fetchQuery } from "../api/ClientAPI";
import Attachments from "../components/Attachments";
import { WEB_SOCKET_URL } from "../api/config";

export default function Chat() {
  const { chatId } = useParams();

  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);
  const wsRef = useRef(null);

  // 🔥 IMPORTANT: temp id stored in ref (not state)
  const tempIdRef = useRef(null);

  const [attachment, setAttachment] = useState(null);

  const onClickSend = async () => {
    if (!query.trim() && !attachment) return;

    const temporaryId = Date.now();
    tempIdRef.current = temporaryId;

    const userQuery = query;

    setChats((prev) => [
      ...prev,
      {
        id: temporaryId,
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
      const { success } = await fetchQuery(userQuery, chatId, attachment?.file);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === temporaryId
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
      console.error("Error fetching query:", err);

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === temporaryId
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

  /* ============================
     FETCH CHATS + WEBSOCKET
  ============================ */
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

    function connectWebSocket() {
      const wsUrl = "ws://127.0.0.1:8000/ws";
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
      };

      ws.onmessage = (e) => {
        const activeTempId = tempIdRef.current;
        if (!activeTempId) return;

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeTempId
              ? {
                  ...chat,
                  answer: e.data,
                  status: "webSocket",
                }
              : chat
          )
        );
      };

      ws.onerror = (err) => {
        console.error("❌ WebSocket error", err);
      };

      ws.onclose = () => {
        console.warn("🔌 WebSocket closed, reconnecting...");
        setTimeout(connectWebSocket, 5000);
      };
    }

    connectWebSocket();

    return () => {
      wsRef.current?.close();
    };
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

  /* ============================
     UI
  ============================ */
  return (
    <div className="flex flex-col h-screen bg-base-100">
      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {chats.map((chat) => (
          <div key={chat.id} className="mb-4 space-y-2">
            {/* USER */}
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

            {/* AI */}
            <div className="chat chat-start w-[70%]">
              <div
                className={`chat-bubble chat-bubble-primary overflow-x-auto ${
                  chat.status === "webSocket"
                    ? "animate-pulse flex justify-between items-center gap-2"
                    : ""
                }`}
              >
                <span
                  className={`${
                    chat.status === "webSocket" || chat.status === "pending"
                      ? "loading loading-dots loading-xl "
                      : ""
                  }`}
                />
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      chat.status === "pending"
                        ? ""
                        : marked.parse(chat.answer || ""),
                  }}
                />
              </div>
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 sticky bottom-0 bg-base-100">
        <div className="relative flex items-end gap-2 bg-base-200 rounded-2xl px-3 py-1">
          <Attachments onSelectFile={setAttachment} />

          <div className="relative flex-1">
            {attachment && (
              <div className="absolute left-2 top-1.5 z-10">
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

            <textarea
              ref={textareaRef}
              placeholder="Ask anything..."
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
              className={`w-full resize-none bg-transparent outline-none leading-6 px-2 py-3 max-h-48 overflow-y-auto ${
                attachment ? "pl-14" : ""
              }`}
            />
          </div>

          <button
            onClick={onClickSend}
            disabled={!query.trim() && !attachment}
            className="btn btn-primary rounded-4xl mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-4"
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
