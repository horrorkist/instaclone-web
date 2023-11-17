import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import SideBarItem from "./SideBarItem";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import ModalOverlay from "./ModalOverlay";
import CreatePostModal from "./Modals/createPostModal";

function SideBar() {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const { data: user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <ModalOverlay exit={closeModal}>
          <CreatePostModal exit={closeModal} />
        </ModalOverlay>
      )}
      <aside
        className={`${
          expanded ? "w-80" : "w-20"
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
            <SideBarItem icon={faSearch} text="Search" expanded={expanded} />
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
          <div className="px-3 mb-4">
            <SideBarItem icon={faBars} text="More" expanded={expanded} />
          </div>
        </nav>
      </aside>
    </>
  );
}

export default SideBar;
