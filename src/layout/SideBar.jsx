import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useEffect, useCallback } from "react";
import { getAllChatIds, newChatForId } from "../api/ClientAPI";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../auth/AuthContext";

const Sidebar = () => {
  const { chats, setChats } = useAuth();
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
      setChats((prev) => [success.chat_id, ...prev]);
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
            <img src={logo} alt="Logo" className="h-8" />
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
                className="my-1.5 inline-block size-6"
              >
                <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                <path d="M12 8v6" />
                <path d="M9 11h6" />
              </svg>
              <span className="is-drawer-close:hidden text-lg">New Chat</span>
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
                <span className="is-drawer-close:hidden truncate textarea-lg">
                  {id}
                </span>
              </Link>
            </li>
          ))}

          {/* Account */}
          <li className="mt-auto sticky bottom-0 is-drawer-close:mr-2">
            <Dropdown />
          </li>
        </ul>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => {
                navigate("/login");
              }}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Unauthorized</h3>
          <p className="py-4">
            Your session has expired. Please log in again to continue.
          </p>
        </div>
      </dialog>
      <dialog id="logout_loader_modal" className="modal">
        <div className=" text-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </dialog>
    </div>
  );
};

export default Sidebar;
