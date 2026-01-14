import ChatMessage from "./ChatMessage";

export default function ChatList({ chats }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 pb-32">
      {chats.map((chat) => (
        <ChatMessage key={chat.id} chat={chat} />
      ))}
    </div>
  );
}
