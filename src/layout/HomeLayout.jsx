import { Outlet } from "react-router-dom";

import TopBar from "./TopBar";
import SideBar from "./SideBar";

export default function HomeLayout() {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        defaultChecked
      />

      <div className="drawer-content flex flex-col h-screen">
        <div className="sticky top-0 z-20">
          <TopBar />
        </div>

        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>

      <SideBar />
    </div>
  );
}
