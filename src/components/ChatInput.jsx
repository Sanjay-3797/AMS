import { useRef, useState } from "react";
import Attachments from "./Attachments";

export default function ChatInput({ onSend }) {
  const [query, setQuery] = useState("");
  const [attachment, setAttachment] = useState(null);
  const textareaRef = useRef(null);

  const send = () => {
    onSend({ query, attachment, textareaRef });
    setQuery("");
    setAttachment(null);
  };

  return (
    <div className="p-4 sticky bottom-0 bg-base-100">
      <div className="relative flex items-end gap-2 bg-base-200 rounded-2xl px-3 py-1">
        <Attachments onSelectFile={setAttachment} />

        <div className="relative flex-1">
          {attachment && (
            <div className="absolute left-2 top-1.5 z-10">
              <img
                src={attachment.preview}
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
                send();
              }
            }}
            className={`w-full resize-none bg-transparent outline-none leading-6 px-2 py-3 max-h-48 overflow-y-auto ${
              attachment ? "pl-14" : ""
            }`}
          />
        </div>

        <button
          onClick={send}
          disabled={!query.trim() && !attachment}
          className="btn btn-primary rounded-4xl mb-2"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
