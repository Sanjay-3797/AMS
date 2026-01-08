import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useEffect, useState } from "react";
import { getAllChatIds } from "../api/auth";

const menuItems = [
  {
    label: "New Chat",
    path: "/new-chat",
    tooltip: "New Chat",
    icon: (
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
    ),
  }
];


const Sidebar = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getAllChatIds();

        setChats(data);
      } catch (err) {
        console.log(err.message);
      }
    };

    loadChats();
  }, []);

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
      <label
        htmlFor="my-drawer-4"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        {/* Sidebar content here */}
        <ul className="menu w-full grow">
          {/* List item */}

          <Link to="/" className="pl-2 pb-1 w-full">
            <img src={logo} alt="Shoes" className="h-6" />
          </Link>
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip={item.tooltip}
              >
                {item.icon}
                <span className="is-drawer-close:hidden">{item.label}</span>
              </Link>
            </li>
          ))}

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

          <li className="flex sticky bottom-0 bg-base-200 align-bottom mt-auto w-full">
            <br />
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
