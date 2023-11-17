import { gql, useMutation, useQuery } from "@apollo/client";
import { uploadImage } from "../../libs/api";
import {
  EditAvatarMutation,
  UploadUrlQuery,
} from "../../__generated__/graphql";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import { UPLOAD_URL_QUERY } from "../../libs/queries";

const EDIT_AVATAR_MUTATION = gql`
  mutation editAvatar($avatar: String) {
    editProfile(avatar: $avatar) {
      ok
      error
    }
  }
`;

function ProfileAvatar({ id }: { id?: string | null }) {
  const { client } = useQuery<UploadUrlQuery>(UPLOAD_URL_QUERY, {
    skip: true,
    fetchPolicy: "no-cache",
  });
  const [avatar, setAvatar] = useState<string>(id || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [editAvatar] = useMutation<EditAvatarMutation>(EDIT_AVATAR_MUTATION);
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    try {
      const file = e.target.files?.[0];

      if (file) {
        const { data } = await client.query({
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
        className="cursor-pointer relative flex justify-center items-center w-40 h-40 rounded-full border-4 border-gray-300 overflow-hidden"
      >
        <input
          onChange={handleAvatarChange}
          id="avatar"
          type="file"
          className="invisible absolute w-full h-full"
          accept="image/*"
        />
        {loading && (
          <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-30">
            <CircularLoadingIndicator size="lg" />
          </div>
        )}
        {avatar ? (
          <img
            src={`https://imagedelivery.net/a9xaKxLjpK4A_4a8CoEUJg/${avatar}/public`}
            alt=""
            className="object-cover"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} size="3x" className="text-gray-300" />
        )}
      </label>
    </div>
  );
}

export default ProfileAvatar;
