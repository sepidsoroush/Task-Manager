import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import TodosContextProvider from "./store/tasks-context";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>
);
