import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logUserOut } from "../../apollo";
import { faDoorOpen, faGear, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import routes from "../../router/routes";
import useDarkMode from "../../hooks/useDarkMode";
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { useTranslation } from "react-i18next";

function MoreExpanded() {
  const onLogoutClick = () => {
    logUserOut();
  };
  const { theme, toggleTheme } = useDarkMode();
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-full w-[250px] z-30 bg-white dark:bg-black left-4 border shadow-float rounded-lg -translate-y-1 flex p-2 gap-y-2 flex-col-reverse">
      <div className="">
        <button
          onClick={onLogoutClick}
          className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md w-full px-2 py-4 gap-x-2"
        >
          <div className="flex justify-center items-center min-w-[20px]">
            <FontAwesomeIcon icon={faDoorOpen} size="lg" />
          </div>
          <div className="font-semibold">{t("more:logOut")}</div>
        </button>
      </div>
      <div className="">
        <Link
          to={`${routes.settings}/${routes.editProfile}`}
          className="flex items-center hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md w-full px-2 py-4 gap-x-2"
        >
          <div className="flex justify-center items-center min-w-[20px]">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </div>
          <div className="font-semibold">{t("more:settings")}</div>
        </Link>
      </div>
      <div className="">
        <div className="flex items-center rounded-md w-full px-2 py-4 justify-between">
          <div className="flex gap-x-2">
            <div className="flex justify-center items-center min-w-[20px]">
              {theme === "light" ? (
                <FontAwesomeIcon icon={faMoon} size="lg" />
              ) : (
                <FontAwesomeIcon icon={faSun} size="lg" />
              )}
            </div>
            <div className="font-semibold">
              {theme === "dark" ? t("more:lightMode") : t("more:darkMode")}
            </div>
          </div>
          <button
            onClick={() => toggleTheme()}
            className="w-10 h-5 rounded-full border border-black dark:border-white flex items-center px-[2px]"
          >
            <div
              className={`h-4 w-4 rounded-full bg-gradient-to-br from-gray-50 via-gray-600 border to-gray-500 shadow-md transition-transform ${
                theme === "dark" && "translate-x-[18px]"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreExpanded;
