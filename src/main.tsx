import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import "./index.css";
import { ThemeProvider } from "./components/layout/theme/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>
);
