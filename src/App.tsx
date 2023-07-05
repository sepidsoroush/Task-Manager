import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Kanban from "./pages/Kanban";
import Calendar from "./pages/Calendar";
import NewTask from "./pages/NewTask";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import Authentication from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Kanban /> },
      { path: "calendar", element: <Calendar /> },
      { path: "newtask", element: <NewTask /> },
      { path: "search", element: <Search /> },
      { path: "notifications", element: <Notifications /> },
      { path: "settings", element: <Settings /> },
      { path: "authentication", element: <Authentication /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
