import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useEffect } from "react";
import { getAllChats } from "../api/auth";

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
  },
  {
    label: "Settings",
    path: "/settings",
    tooltip: "Settings",
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
        <path d="M12 15.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33a1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.39 1.26 1 1.51H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const Sidebar = () => {

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getAllChats();
        console.log(data);
      } catch (err) {
        alert(err.message);
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
          <li className="flex align-bottom mt-auto w-full">
            <br />
            <Link
              to="/account"
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
