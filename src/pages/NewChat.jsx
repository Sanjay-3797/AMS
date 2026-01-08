import { useState } from "react";
import { marked } from "marked";


const NewChat = () => {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const onClickSend = () => {
    if (!query.trim()) return;

    setChatHistory((prev) => [
      ...prev,
      { [query]: "This is a sample answer." },
    ]);

    setQuery("");
  };

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
        {chatHistory.map((item, index) => {
          const [question, answer] = Object.entries(item)[0];

          return (
            <div key={index} className="mb-4 space-y-2">
              <div className="chat chat-end">
                <div className="chat-bubble chat-bubble-primary">
                  {question}
                </div>
              </div>

              <div className="chat chat-start">
                <div
                  className="chat-bubble w-[60%]"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(answer),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 sticky bottom-0 rounded-2xl">
        <textarea
          placeholder="Ask anything..."
          className="w-full textarea textarea-xl pr-20 rounded-2xl"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
};

export default NewChat;
