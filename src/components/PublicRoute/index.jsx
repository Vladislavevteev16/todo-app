import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = () => {
  const { token } = useSelector((state) => state.auth);

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};
