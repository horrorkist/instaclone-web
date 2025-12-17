import { useMutation } from "@apollo/client";
import { uploadImage } from "../../libs/api";
import {
  EditAvatarMutation,
  UploadUrlQuery,
} from "../../__generated__/graphql";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import { EDIT_AVATAR_MUTATION, UPLOAD_URL_QUERY } from "../../libs/queries";
import { getPhotoUrl } from "../../libs/utils";
import client from "../../apollo";

function ProfileAvatar({ id, isMe }: { id?: string | null; isMe: boolean }) {
  const [avatar, setAvatar] = useState<string>(id || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [editAvatar] = useMutation<EditAvatarMutation>(EDIT_AVATAR_MUTATION);
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];

      if (file) {
        const { data } = await client.query<UploadUrlQuery>({
          query: UPLOAD_URL_QUERY,
          fetchPolicy: "no-cache",
        });
        const result = await uploadImage(file, data.getUploadUrl);

        if (result.success) {
          await editAvatar({
            variables: {
              avatar: result.result.id,
            },
          });

          setAvatar(result.result.id);
        }
      }
    } catch {
      alert("Failed to upload avatar");
    }
    setLoading(false);
  };
  return (
    <div className="">
      <label
        htmlFor="avatar"
        className={`${
          isMe && "cursor-pointer"
        } relative flex justify-center items-center w-40 h-40 rounded-full border-4 border-gray-300 overflow-hidden`}
      >
        {isMe && (
          <input
            onChange={handleAvatarChange}
            id="avatar"
            type="file"
            className="invisible absolute w-full h-full"
            accept="image/*"
          />
        )}
        {loading && (
          <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-30">
            <CircularLoadingIndicator size="lg" />
          </div>
        )}
        {avatar ? (
          <img
            src={getPhotoUrl({ id: avatar })}
            alt=""
            className="object-cover w-full h-full overflow-hidden"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-300" />
        )}
      </label>
    </div>
  );
}

export default ProfileAvatar;
