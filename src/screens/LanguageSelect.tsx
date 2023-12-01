import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";

function LanguageSelect() {
  const { t, i18n } = useTranslation();

  const changeLanguageTo = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative flex flex-col px-10 pt-16 w-full">
      <header className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-medium">
          {t("language:languagePreferences")}
        </h2>
        <h4 className="text-sm font-semibold text-gray-400">
          {t("language:header")}
        </h4>
      </header>
      <div className="flex flex-col my-10 gap-y-8 w-full">
        <button
          onClick={() => changeLanguageTo("ko")}
          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg flex justify-between"
        >
          <span>한국어</span>
          <div
            className={`h-7 w-7 flex justify-center items-center rounded-full ${
              i18n.language === "ko" ? "bg-blue-500" : "border"
            } border-black dark:border-gray-400 text-white`}
          >
            {i18n.language === "ko" && <FontAwesomeIcon icon={faCheck} />}
          </div>
        </button>
        <button
          onClick={() => changeLanguageTo("en")}
          className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg flex justify-between"
        >
          <span>English</span>
          <div
            className={`h-7 w-7 flex justify-center items-center rounded-full ${
              i18n.language === "en" ? "bg-blue-500" : "border"
            } border-black dark:border-gray-400 text-white`}
          >
            {i18n.language === "en" && <FontAwesomeIcon icon={faCheck} />}
          </div>
        </button>
      </div>
    </div>
  );
}

export default LanguageSelect;
