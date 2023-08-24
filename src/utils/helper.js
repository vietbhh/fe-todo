function checkToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  return true;
}

function logout() {
  localStorage.removeItem("token");
}

export { checkToken, logout };
