import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../api/ClientAPI";

const Dropdown = () => {
  const navigate = useNavigate();

  const username = JSON.parse(localStorage.getItem("user"))?.username;
  const userInitial = username ? username.charAt(0).toUpperCase() : "U";

  const logOutUser = async () => {
    try {
      document.getElementById("logout_loader_modal")?.showModal();

      const data = await logoutUser();

      if (data?.success) {
        navigate("/login");
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      document.getElementById("logout_loader_modal")?.close();
    }
  };

  return (
    <>
      {/* Dropdown */}
      <div className="dropdown dropdown-top bg-base-200">
        <div tabIndex={0} role="button">
          <div className="avatar avatar-placeholder">
            <div className="bg-neutral text-neutral-content w-10 rounded-full">
              <span className="text-xl">{userInitial}</span>
            </div>
          </div>
          <span className="is-drawer-close:hidden text-xl pl-2">
            {username}
          </span>
        </div>

        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a onClick={logOutUser}>Logout</a>
          </li>
          <li>
            <a>Account</a>
          </li>
        </ul>
      </div>
      
    </>
  );
};

export default Dropdown;
