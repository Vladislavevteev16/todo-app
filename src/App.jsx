import { TaskView } from "./components/TaskView";
import { Layout } from "./components/Layout";
import { RegisterForm } from "./components/RegisterForm";
import { PublicRoute } from "./components/PublicRoute";
import "./App.css";

import { Route, Routes, Navigate } from "react-router";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginForm } from "./components/LoginForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<TaskView />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="register" element={<RegisterForm />}></Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="login" element={<LoginForm />}></Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
