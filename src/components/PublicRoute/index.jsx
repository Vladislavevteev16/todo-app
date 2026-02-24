import { Navigate, Outlet } from "react-router";

import { useAuth } from "../../hooks/useAuth";

export const PublicRoute = () => {
  const {
    state: { token },
  } = useAuth();

  return !token ? <Outlet /> : <Navigate to="/" replace />;
};
