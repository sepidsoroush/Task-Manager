import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import { Toaster } from "@/components/ui/toaster";

function RootLayout() {
  return (
    <React.Fragment>
      <Toaster />

      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <main className="flex w-full flex-1 flex-col overflow-hidden">
            <Outlet />
          </main>
        </div>
      </div>
    </React.Fragment>
  );
}

export default RootLayout;
