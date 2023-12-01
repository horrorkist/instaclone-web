import { Link, Outlet, useLocation } from "react-router-dom";
import routes from "../router/routes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function Settings() {
  const { pathname } = useLocation();
  const [path, setPath] = useState(pathname);
  const { t } = useTranslation();

  useEffect(() => {
    setPath(pathname.split("/")[2]);
  }, [pathname]);

  return (
    <div className="w-full h-screen bg-white dark:bg-black dark:text-white flex pl-72">
      <aside className="w-72 h-full border-r bg-white dark:bg-black flex flex-col pt-10">
        <header className="p-6">
          <h1 className="text-2xl font-bold px-4">{t("settings:settings")}</h1>
        </header>
        <div className="flex flex-col px-6 gap-y-2">
          <Link
            to={routes.editProfile}
            className={`${
              path === routes.editProfile && "bg-gray-200 dark:bg-gray-400"
            } px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg`}
          >
            {t("shared:editProfile")}
          </Link>
          <Link
            to={routes.languagePreferences}
            className={`${
              path === routes.languagePreferences &&
              "bg-gray-200 dark:bg-gray-400"
            } px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500 rounded-lg`}
          >
            {t("settings:language")}
          </Link>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}

export default Settings;
