import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Kanban from "./pages/Kanban";
// import Authentication from "./pages/Authentication";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Kanban /> },
      // {
      //   path: "/auth",
      //   element: <Authentication />,
      // },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
