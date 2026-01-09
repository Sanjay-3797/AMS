import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useEffect, useState, useCallback } from "react";
import { getAllChatIds, newChatForId } from "../api/ClientAPI";

const Sidebar = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const loadChats = useCallback(async () => {
    try {
      const data = await getAllChatIds();
      setChats(data || []);
    } catch (err) {
      console.error(err?.message || err);
    }
  }, []);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  const handleNewChat = async () => {
    try {
      const { success } = await newChatForId();
      if (!success.chat_id) return;
      // append new chat id
      setChats((prev) => [success.chat_id, ...prev]);
      // navigate to the new chat
      navigate(`/chat/${success.chat_id}`);
    } catch (err) {
      console.error(err?.message || err);
    }
  };

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <ul className="menu w-full grow">
          {/* Logo */}
          <Link to="/" className="pl-2 pb-1 w-full">
            <img src={logo} alt="Logo" className="h-6" />
          </Link>

          {/* New Chat button */}
          <li>
            <button
              onClick={handleNewChat}
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right flex items-center gap-2"
              data-tip="New Chat"
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
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                <path d="M12 8v6" />
                <path d="M9 11h6" />
              </svg>
              <span className="is-drawer-close:hidden">New Chat</span>
            </button>
          </li>

          {/* Existing chats */}
          {chats.map((id) => (
            <li key={id}>
              <Link
                to={`/chat/${id}`}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Chat"
              >
                <span className="is-drawer-close:hidden truncate">{id}</span>
              </Link>
            </li>
          ))}

          {/* Account */}
          <li className="mt-auto sticky bottom-0 bg-base-200">
            <Link
              to="/login"
              className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Account"
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
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20a8 8 0 0 1 16 0" />
              </svg>
              <span className="is-drawer-close:hidden">Account</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
