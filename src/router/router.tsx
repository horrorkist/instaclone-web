import { createBrowserRouter } from "react-router-dom";
import LogIn from "../screens/LogIn";
import SignUp from "../screens/SignUp";
import routes from "./routes";
import Root from "../Root";
import Profile from "../screens/Profile";
import Posts from "../screens/Posts";
import Home from "../screens/Home";
import Settings from "../screens/Settings";
import EditProfile from "../screens/EditProfile";
import ChatRoomsList from "../screens/ChatRoomsList";
import ChatRoom from "../screens/ChatRoom";
import ChatDefault from "../screens/ChatDefault";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    errorElement: <h1>Not root</h1>,
    children: [
      {
        path: routes.home,
        element: <Home />,
        errorElement: <h1>Not home</h1>,
      },
      {
        path: routes.profile,
        element: <Profile />,
        errorElement: <h1>Not profile</h1>,
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
      {
        path: routes.settings,
        element: <Settings />,
        children: [
          {
            path: "",
            element: <h1>Not Found</h1>,
          },
          {
            path: routes.editProfile,
            element: <EditProfile />,
            errorElement: <h1>Not Found</h1>,
          },
          {
            path: routes.languagePreferences,
            element: <h1>Not Supported</h1>,
            errorElement: <h1>Not Found</h1>,
          },
        ],
      },
      {
        path: routes.messages,
        element: <ChatRoomsList />,
        errorElement: <h1>Not Found</h1>,
        children: [
          {
            path: "",
            element: <ChatDefault />,
            errorElement: <h1>Something went wrong.</h1>,
          },
          {
            path: ":roomId/:username",
            element: <ChatRoom />,
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
