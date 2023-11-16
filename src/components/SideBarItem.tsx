import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ISideBarItemProps {
  expanded: boolean;
  icon: IconDefinition;
  text: string;
  onClick?: () => void;
}

function SideBarItem({ expanded, icon, text }: ISideBarItemProps) {
  return (
    <li className="relative group flex gap-x-4 items-center font-medium hover:bg-gray-300 p-4 rounded-md h-12 transition-colors duration-100">
      <FontAwesomeIcon
        icon={icon}
        size="lg"
        className="group-hover:scale-110 duration-300 group-active:scale-75"
      />
      <span
        className={`${
          expanded ? "opacity-100" : "invisible opacity-0"
        } duration-500 group-active:text-gray-500 transition-sideBarItem select-none`}
      >
        {text}
      </span>
      {!expanded && (
        <span className="absolute invisible scale-0 group-hover:scale-100 opacity-0 group-hover:visible group-hover:opacity-100 group-hover:delay-500 duration-300 left-full ml-4 px-4 py-2 rounded-md shadow-md border">
          {text}
        </span>
      )}
    </li>
  );
}

export default SideBarItem;
