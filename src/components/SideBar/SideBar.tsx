import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import SideBarItem from "./SideBarItem";
import { faPaperPlane, faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import ModalOverlay from "../ModalOverlay";
import CreatePostModal from "../Modals/createPostModal";
import Search from "../Search";
import MoreExpanded from "./MoreExpanded";
import routes from "../../router/routes";
import { useTranslation } from "react-i18next";

function SideBar() {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const { t } = useTranslation();

  const closeModal = () => setIsModalOpen(false);

  const onToggleSearch = () => {
    setSearchExpanded((prev) => !prev);
    setExpanded((prev) => !prev);
  };

  // shrink more when clicked out of the more expanded
  useEffect(() => {
    const setMoreExpandedFalse = (e: any) => {
      const more = document.querySelector(".more");
      if (more?.contains(e.target)) return;
      setMoreExpanded(false);
    };
    if (moreExpanded) {
      document.addEventListener("click", setMoreExpandedFalse);
    }

    return () => {
      document.removeEventListener("click", setMoreExpandedFalse);
    };
  }, [moreExpanded]);

  // shrink search when clicked out of sidebar
  useEffect(() => {
    const setSearchExpandedFalse = (e: any) => {
      const sidebar = document.querySelector(".sidebar");
      const search = document.querySelector(".search");
      if (sidebar?.contains(e.target)) return;
      if (search?.contains(e.target)) return;
      setSearchExpanded(false);
      setExpanded(true);
    };
    if (searchExpanded) {
      document.addEventListener("click", setSearchExpandedFalse);
    }

    return () => {
      document.removeEventListener("click", setSearchExpandedFalse);
    };
  }, [searchExpanded]);

  return (
    <>
      {isModalOpen && (
        <ModalOverlay exit={closeModal}>
          <CreatePostModal exit={closeModal} />
        </ModalOverlay>
      )}
      {searchExpanded && <Search />}
      <aside
        className={`${
          expanded ? "w-72" : "w-20"
        } h-screen sidebar duration-500 bg-white fixed top-0 left-0 z-30 dark:bg-black text-black dark:text-white`}
      >
        <nav className="h-full flex flex-col border-r shadow-sm">
          <div
            onClick={() => setExpanded((prev) => !prev)}
            className="p-6 flex gap-x-4 items-center"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            <h1
              className={`text-3xl ${
                expanded ? "opacity-100" : "invisible opacity-0"
              } duration-500 origin-left`}
            >
              Instagram
            </h1>
          </div>
          <ul className="flex-1 px-3 mt-6 gap-y-4 flex flex-col">
            <SideBarItem
              icon={faHome}
              text={t("sideBar:home")}
              expanded={expanded}
              onClick={() => navigate("/")}
            />
            <SideBarItem
              icon={faSearch}
              text={t("sideBar:search")}
              expanded={expanded}
              onClick={onToggleSearch}
            />
            <SideBarItem
              icon={faPaperPlane}
              text={t("sideBar:messages")}
              expanded={expanded}
              onClick={() => navigate(routes.messages)}
            />
            <SideBarItem
              icon={faPlus}
              text={t("sideBar:create")}
              expanded={expanded}
              onClick={() => setIsModalOpen(true)}
            />
            <SideBarItem
              icon={faUser}
              text={t("sideBar:profile")}
              expanded={expanded}
              onClick={() => navigate(`/${user?.me.me?.username}`)}
            />
          </ul>
          <div className="px-3 mb-4 relative more">
            <SideBarItem
              icon={faBars}
              text={t("sideBar:more")}
              expanded={expanded}
              onClick={() => setMoreExpanded((prev) => !prev)}
              className=""
            />
            {moreExpanded && <MoreExpanded />}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
