import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCompass,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import SideBarItem from "./SideBarItem";
import { faMessage } from "@fortawesome/free-regular-svg-icons/faMessage";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function SideBar() {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={`${expanded ? "w-80" : "w-20"} h-screen duration-500`}>
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
          <SideBarItem icon={faHome} text="Home" expanded={expanded} />
          <SideBarItem icon={faSearch} text="Search" expanded={expanded} />
          <SideBarItem icon={faMessage} text="Message" expanded={expanded} />
          <SideBarItem icon={faUser} text="Profile" expanded={expanded} />
        </ul>
        <div className="px-3 mb-4">
          <SideBarItem icon={faBars} text="More" expanded={expanded} />
        </div>
      </nav>
    </aside>
  );
}

export default SideBar;
