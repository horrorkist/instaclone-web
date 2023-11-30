import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { logUserOut } from "../../apollo";
import { faDoorOpen, faGear, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import routes from "../../router/routes";

function MoreExpanded() {
  const onLogoutClick = () => {
    logUserOut();
  };
  return (
    <div className="absolute bottom-full w-[250px] z-30 bg-white left-4 border shadow-float rounded-lg -translate-y-1 flex p-2 gap-y-2 flex-col-reverse">
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
        <Link
          to={`${routes.settings}/${routes.editProfile}`}
          className="flex items-center hover:bg-gray-100 rounded-md w-full px-2 py-4 gap-x-2"
        >
          <div className="flex justify-center items-center min-w-[20px]">
            <FontAwesomeIcon icon={faGear} size="lg" />
          </div>
          <div className="font-semibold">Settings</div>
        </Link>
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
  );
}

export default MoreExpanded;
