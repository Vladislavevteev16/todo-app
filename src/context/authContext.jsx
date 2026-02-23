import { createContext, useReducer } from "react";

import { authReducer } from "../reducer/authReducer";

const initialValue = {
  token: null,
  loading: false,
  error: null,
  message: null,
};

export const AuthContext = createContext(initialValue);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialValue,
    token: localStorage.getItem("token") || null,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
