import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

function RootLayout() {
  return (
    <React.Fragment>
      <main>
        <Outlet />
        <Sidebar />
      </main>
    </React.Fragment>
  );
}

export default RootLayout;
