import { Outlet } from "react-router-dom";
import { AppShell, Navbar } from "@mantine/core";
import Sidebar from "../components/sidebar/Sidebar";

function RootLayout() {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          <Sidebar />
        </Navbar>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <main>
        <Outlet />
      </main>
    </AppShell>
  );
}

export default RootLayout;
