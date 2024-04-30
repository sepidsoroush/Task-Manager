import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Header from "@/components/layout/header/Header";

function RootLayout() {
  return (
    <React.Fragment>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <aside className=" md:w-[220px] flex-col flex border-r bg-background/60 backdrop-blur-xl transition-all py-2 px-0 md:px-2">
            <Sidebar />
          </aside>
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
