import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function RootLayout() {
  return (
    <React.Fragment>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
