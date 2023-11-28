import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getPhotoUrl } from "../libs/utils";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Avatar({ avatar }: { avatar?: string }) {
  return (
    <div
      className={`w-7 h-7 rounded-full flex justify-center items-center overflow-hidden bg-gray-200`}
    >
      {avatar ? (
        <img src={getPhotoUrl({ id: avatar })} className="object-cover" />
      ) : (
        <FontAwesomeIcon icon={faUser} className="text-gray-500" />
      )}
    </div>
  );
}

export default Avatar;
