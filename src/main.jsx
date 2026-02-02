import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TodosProvider } from "./context/index.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodosProvider>
      <App />
    </TodosProvider>
  </StrictMode>,
);
