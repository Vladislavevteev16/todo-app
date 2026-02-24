import { todoApi } from "../todoApi";

export const requestTodos = {
  getAll: () => todoApi.get("/api/todos"),
  addTask: (todo) => todoApi.post("/api/todos", todo),
  updateTaskTitle: (id, title) => todoApi.patch(`/api/todos/${id}`, { title }),
  deleteTask: (id) => todoApi.delete(`/api/todos/${id}`),
  toggleTaskCompleted: (id) => todoApi.patch(`/api/todos/${id}/isCompleted`),
};
