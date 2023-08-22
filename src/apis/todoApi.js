import http from "../utils/http";

export const getTodos = () => http.get("todos");

export const createTodo = (data) =>
  http.post("todos/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const updateStatusTodo = (id) => http.get(`todos/update-status/${id}`);

export const deleteTodo = (id) => http.get(`todos/delete/${id}`);
