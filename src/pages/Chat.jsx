import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { fetchChatsWithId, fetchQuery } from "../api/ClientAPI";
import ChatList from "../components/ChatList";
import ChatInput from "../components/ChatInput";
import useChatWebSocket from "../components/useChatWebSocket";

export default function Chat() {
  const { chatId } = useParams();

  const [chats, setChats] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const tempIdRef = useRef(null);

  useChatWebSocket({ tempIdRef, setChats, chatId });

  useEffect(() => {
    async function loadChats() {
      try {
        const result = await fetchChatsWithId(chatId);

        const normalized = Array.isArray(result)
          ? result.map((item, index) => {
              const [question, answer] = Object.entries(item || {})[0] || [];
              return {
                id: index + Date.now(),
                question: question ?? "",
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
    }

    loadChats();
  }, [chatId]);

  const handleSend = async ({ query, attachment, textareaRef }) => {
    if (!query.trim() && !attachment) return;

    const temporaryId = Date.now();
    tempIdRef.current = temporaryId;

    setChats((prev) => [
      ...prev,
      {
        id: temporaryId,
        question: query,
        attachment,
        answer: "",
        status: "pending",
      },
    ]);

    textareaRef.current && (textareaRef.current.style.height = "auto");

    try {
      const { success } = await fetchQuery(query, chatId, attachment?.file);

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
    } catch {
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

  if (loading)
    return (
      <div className="p-4 h-screen flex items-center justify-center">
        Loading chats...
      </div>
    );

  if (error)
    return (
      <div className="p-4 h-screen flex items-center justify-center text-red-600">
        Error fetching chats: {error}
      </div>
    );

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <ChatList chats={chats} />
      <ChatInput onSend={handleSend} />
    </div>
  );
}
