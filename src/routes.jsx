import { createBrowserRouter, Link } from "react-router-dom";
import Todo from "./pages/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Todo />
  },
  {
    path: "about",
    element: <div>About</div>
  }
]);

export default router;
