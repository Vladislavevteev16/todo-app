import axios from "axios";

const TODOS_API_URL = "https://todo-redev.herokuapp.com/";

export const todoApi = axios.create({
  baseURL: TODOS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

todoApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("token");

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }

  return request;
});
