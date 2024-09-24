import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import User from "./components/User";
import UploadFileForm from "./components/UploadFileForm";
import Folder from "./components/Folder";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <User />
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
        },
        {
          path: "/:id/upload",
          element: <UploadFileForm />
        },
        {
          path: "/:id/:folderId",
          element: <Folder />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
