import http from "../utils/http";

export const getTodos = () =>
  http.get("todos", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const createTodo = (data) =>
  http.post("todos/create", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const updateStatusTodo = (id) =>
  http.get(`todos/update-status/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });

export const deleteTodo = (id) =>
  http.get(`todos/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
