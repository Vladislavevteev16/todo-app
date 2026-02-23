import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router";

import { TodosProvider } from "./context/todosContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";

import App from "./App.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/todo-app/">
      <AuthProvider>
        <TodosProvider>
          <App />
        </TodosProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
