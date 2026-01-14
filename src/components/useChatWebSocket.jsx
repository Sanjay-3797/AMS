import { useEffect, useRef } from "react";
import { WEB_SOCKET_URL } from "../api/config";

export default function useChatWebSocket({ tempIdRef, setChats, chatId }) {
  const wsRef = useRef(null);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WEB_SOCKET_URL);
      wsRef.current = ws;

      ws.onmessage = (e) => {
        const activeId = tempIdRef.current;
        if (!activeId) return;

        setChats((prev) =>
          prev.map((chat) =>
            chat.id === activeId
              ? { ...chat, answer: e.data, status: "webSocket" }
              : chat
          )
        );
      };

      ws.onclose = () => setTimeout(connect, 5000);
    }

    connect();
    return () => wsRef.current?.close();
  }, [chatId]);
}
