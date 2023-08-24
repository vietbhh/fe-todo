import http from "../utils/http";

export const registerAccount = (data) =>
  http.post("register", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const loginAccount = (data) =>
  http.post("login", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
