import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getAvatarSize, getPhotoUrl } from "../libs/utils";
import { faUser } from "@fortawesome/free-regular-svg-icons";

function Avatar({
  avatar,
  size = "md",
}: {
  avatar?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) {
  return (
    <div
      className={`${getAvatarSize(
        size
      )} rounded-full flex justify-center items-center overflow-hidden bg-gray-200`}
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
