import { createBrowserRouter } from "react-router-dom";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
import routes from "./routes";

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
    errorElement: <h1>Not Found</h1>,
  },
  {
    path: routes.signUp,
    element: <SignUp />,
  },
]);

export default router;
