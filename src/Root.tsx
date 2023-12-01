import useUser from "./hooks/useUser";
import Splash from "./screens/Splash";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import useDarkMode from "./hooks/useDarkMode";

function Root() {
  const { loading } = useUser();
  const { toggleTheme } = useDarkMode();

  if (loading) {
    return <Splash />;
  }

  return (
    <div className="w-screen relative flex justify-center bg-white dark:bg-black">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Root;
