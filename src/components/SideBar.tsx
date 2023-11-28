import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faDoorOpen,
  faGear,
  faHome,
  faMoon,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import SideBarItem from "./SideBarItem";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import ModalOverlay from "./ModalOverlay";
import CreatePostModal from "./Modals/createPostModal";
import { logUserOut } from "../apollo";
import Search from "./Search";

function SideBar() {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [moreExpanded, setMoreExpanded] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const onLogoutClick = () => {
    logUserOut();
  };

  const onToggleSearch = () => {
    setSearchExpanded((prev) => !prev);
    setExpanded((prev) => !prev);
  };

  useEffect(() => {
    const setMoreExpandedFalse = (e) => {
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
        } h-screen duration-500 bg-white fixed top-0 left-0 z-10`}
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
              text="Home"
              expanded={expanded}
              onClick={() => navigate("/")}
            />
            <SideBarItem
              icon={faSearch}
              text="Search"
              expanded={expanded}
              onClick={onToggleSearch}
            />
            <SideBarItem icon={faMessage} text="Message" expanded={expanded} />
            <SideBarItem
              icon={faPlus}
              text="Create"
              expanded={expanded}
              onClick={() => setIsModalOpen(true)}
            />
            <SideBarItem
              icon={faUser}
              text="Profile"
              expanded={expanded}
              onClick={() => navigate(`/${user?.me.me?.username}`)}
            />
          </ul>
          <div className="px-3 mb-4 relative more">
            <SideBarItem
              icon={faBars}
              text="More"
              expanded={expanded}
              onClick={() => setMoreExpanded((prev) => !prev)}
              className=""
            />
            {moreExpanded && (
              <div className="absolute bottom-full w-[250px] bg-white left-4 border shadow-float rounded-lg -translate-y-1 flex p-2 gap-y-2 flex-col-reverse">
                <div className="">
                  <button
                    onClick={onLogoutClick}
                    className="flex items-center hover:bg-gray-100 rounded-md w-full px-2 py-4 gap-x-2"
                  >
                    <div className="flex justify-center items-center min-w-[20px]">
                      <FontAwesomeIcon icon={faDoorOpen} size="lg" />
                    </div>
                    <div className="font-semibold">Log Out</div>
                  </button>
                </div>
                <div className="">
                  <button className="flex items-center hover:bg-gray-100 rounded-md w-full px-2 py-4 gap-x-2">
                    <div className="flex justify-center items-center min-w-[20px]">
                      <FontAwesomeIcon icon={faGear} size="lg" />
                    </div>
                    <div className="font-semibold">Settings</div>
                  </button>
                </div>
                <div className="">
                  <button className="flex items-center hover:bg-gray-100 rounded-md w-full px-2 py-4 gap-x-2">
                    <div className="flex justify-center items-center min-w-[20px]">
                      <FontAwesomeIcon icon={faMoon} size="lg" />
                    </div>
                    <div className="font-semibold">Switch appearance</div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
