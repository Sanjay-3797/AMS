import { marked } from "marked";

export default function ChatMessage({ chat }) {
  return (
    <div className="mb-4 space-y-2">
      {/* USER */}
      <div className="chat chat-end">
        {chat.attachment && (
          <img
            src={chat.attachment.preview}
            alt="attachment"
            className="rounded-lg h-20 border"
          />
        )}
        {chat.question && <div className="chat-bubble">{chat.question}</div>}
      </div>

      {/* AI */}
      <div className="chat chat-start w-[70%]">
        <div
          className={`chat-bubble chat-bubble-primary overflow-x-auto ${
            chat.status === "webSocket"
              ? "animate-pulse flex items-center gap-2"
              : ""
          }`}
        >
          {(chat.status === "pending" || chat.status === "webSocket") && (
            <span className="loading loading-dots loading-xl" />
          )}

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
  );
}
