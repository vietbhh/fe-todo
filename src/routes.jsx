import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";
import Todo from "./pages/Todo";
import Auth from "./pages/Auth";
import { Login, Register } from "./components/Auth";
import { checkToken } from "./utils/helper";

function ProtectedRoute() {
  return !checkToken() ? <Navigate to="/login" /> : <Outlet />;
}

function RedirectRoute() {
  return checkToken() ? <Navigate to="/" /> : <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Todo />
      }
    ]
  },
  {
    element: <RedirectRoute />,
    children: [
      {
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />
          },
          {
            path: "register",
            element: <Register />
          }
        ]
      }
    ]
  },
  {
    path: "about",
    element: <div>About</div>
  }
]);

export default router;
