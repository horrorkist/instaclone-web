import { Link, Outlet, useLocation } from "react-router-dom";
import routes from "../router/routes";
import { useEffect, useState } from "react";

function Settings() {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);

  useEffect(() => {
    setPath(pathname.split("/")[2]);
  }, [pathname]);

  return (
    <div className="w-full h-screen bg-white flex pl-72">
      <aside className="w-72 h-full border-r bg-white flex flex-col mt-10">
        <header className="p-6">
          <h1 className="text-2xl font-bold px-4">Settings</h1>
        </header>
        <div className="flex flex-col px-6 gap-y-2">
          <Link
            to={routes.editProfile}
            className={`${
              path === routes.editProfile && "bg-gray-200"
            } px-4 py-2 hover:bg-gray-300 rounded-lg`}
          >
            Edit Profile
          </Link>
          <Link
            to={routes.languagePreferences}
            className={`${
              path === routes.languagePreferences && "bg-gray-200"
            } px-4 py-2 hover:bg-gray-300 rounded-lg`}
          >
            Language
          </Link>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default Settings;
