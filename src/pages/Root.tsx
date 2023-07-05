import { Outlet } from "react-router-dom";

import Sidebar from "../components/sidebar/Sidebar";

function RootLayout() {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
