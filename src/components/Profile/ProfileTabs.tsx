import { faBookmark, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function ProfileTabs() {
  const { pathname } = useLocation();
  const [tab, setTab] = useState<string>();
  const { t } = useTranslation();

  useEffect(() => {
    setTab(pathname.split("/")[2] || "");
  }, [pathname]);

  return (
    <div className="border-t flex justify-center gap-x-20">
      <Link
        to=""
        className={`${
          tab === "" ? "border-t border-black dark:border-white" : ""
        } py-4 flex items-center gap-x-2`}
      >
        <FontAwesomeIcon icon={faTableCells} size="xs" />
        <span className="text-xs font-medium">{t("profile:posts")}</span>
      </Link>
      <Link
        to="saved"
        className={`${
          tab === "saved" ? "border-t border-black dark:border-white" : ""
        } py-4 flex items-center gap-x-2`}
      >
        <FontAwesomeIcon icon={faBookmark} size="xs" />
        <span className="text-xs font-medium">{t("profile:saved")}</span>
      </Link>
      <Link
        to="tagged"
        className={`${
          tab === "tagged" ? "border-t border-black dark:border-white" : ""
        } py-4 flex items-center gap-x-2`}
      >
        <FontAwesomeIcon icon={faUserCircle} size="xs" />
        <span className="text-xs font-medium">{t("profile:tagged")}</span>
      </Link>
    </div>
  );
}

export default ProfileTabs;
