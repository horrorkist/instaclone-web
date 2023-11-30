import useUser from "./hooks/useUser";
import Splash from "./screens/Splash";
import SideBar from "./components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

function Root() {
  const { loading } = useUser();

  if (loading) {
    return <Splash />;
  }

  return (
    <div className="w-screen relative flex justify-center">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default Root;
