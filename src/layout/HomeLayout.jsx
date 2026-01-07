import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

export default function HomeLayout() {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Topbar */}
        <TopBar />

        {/* Page content */}
        <div className="p-4 h-11/12">
          <Outlet />
        </div>
      </div>

      <Sidebar />
    </div>
  );
}
