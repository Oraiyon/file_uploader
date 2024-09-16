import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import User from "./components/User";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/:id",
      element: <User />
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
