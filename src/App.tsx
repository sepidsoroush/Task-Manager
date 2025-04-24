import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/Root";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./pages/ProtectedRoute";
import MarketingPage from "./pages/Marketing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MarketingPage />,
  },
  {
    path: "/tasks",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Tasks /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
