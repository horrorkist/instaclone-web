import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Splash() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-white dark:bg-black text-white dark:text-black">
      <FontAwesomeIcon icon={faInstagram} size="7x" className="animate-pulse" />
    </div>
  );
}

export default Splash;
