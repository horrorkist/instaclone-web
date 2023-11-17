import { createBrowserRouter } from "react-router-dom";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import routes from "./routes";
import Root from "../Root";
import Profile from "../screens/Profile";
import Posts from "../screens/Posts";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <h1>Not Found</h1>,
    children: [
      {
        path: routes.home,
        element: <h1>Home</h1>,
        errorElement: <h1>Not Found</h1>,
      },
      {
        path: routes.profile,
        element: <Profile />,
        errorElement: <h1>Not asdf</h1>,
        children: [
          {
            path: routes.profilePosts,
            element: <Posts />,
            errorElement: <h1>Not Found</h1>,
          },
          {
            path: routes.profileSaved,
            element: <h1>Not Supported</h1>,
            errorElement: <h1>Not Found</h1>,
          },
          {
            path: routes.profileTagged,
            element: <h1>Not Supported</h1>,
            errorElement: <h1>Not Found</h1>,
          },
        ],
      },
    ],
  },
  {
    path: routes.login,
    element: <LogIn />,
    errorElement: <h1>Not Found</h1>,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
  },
]);

export default router;
