import { todoApi } from "../todoApi";

export const requestAuth = {
  register: (userData) => todoApi.post("/api/users/register", userData),
  login: (credentials) => todoApi.post("/api/auth/login", credentials),
};
