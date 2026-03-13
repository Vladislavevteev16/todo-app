import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
