import { createBrowserRouter } from "react-router-dom";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import routes from "./routes";
import Root from "../Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <h1>Not Found</h1>,
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
