import { RouterProvider, createBrowserRouter } from "react-router-dom";

// import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Tasks from "./pages/Tasks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <ErrorPage />,
    children: [{ index: true, element: <Tasks /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
