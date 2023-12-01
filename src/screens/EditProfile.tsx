import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "../hooks/useUser";
import { getPhotoUrl } from "../libs/utils";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import client from "../apollo";
import {
  EDIT_AVATAR_MUTATION,
  EDIT_PROFILE_MUTATION,
  ME_QUERY,
  UPLOAD_URL_QUERY,
} from "../libs/queries";
import {
  EditAvatarMutation,
  EditAvatarMutationVariables,
  EditProfileMutation,
  EditProfileMutationVariables,
  UploadUrlQuery,
  UploadUrlQueryVariables,
} from "../__generated__/graphql";
import { uploadImage } from "../libs/api";
import CircularLoadingIndicator from "../components/CircularLoadingIndicator";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface IEditProfileForm {
  firstName: string;
  lastName?: string;
  bio?: string;
}

function EditProfile() {
  const { loading, data, refetch } = useUser();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (imageLoading) return;

    setImageLoading(true);
    const file = e.target.files?.[0];
    if (file) {
      const { data } = await client.query<
        UploadUrlQuery,
        UploadUrlQueryVariables
      >({
        query: UPLOAD_URL_QUERY,
        fetchPolicy: "no-cache",
      });

      const result = await uploadImage(file, data.getUploadUrl);

      if (result.success) {
        await client.mutate<EditAvatarMutation, EditAvatarMutationVariables>({
          mutation: EDIT_AVATAR_MUTATION,
          variables: {
            avatar: result.result.id,
          },
        });
        await refetch();
      } else {
        alert("Failed to upload avatar");
      }
    }
    setImageLoading(false);
  };
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { isValid },
  } = useForm<IEditProfileForm>();

  const { t } = useTranslation();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [editNotification, setEditNotification] = useState<
    "" | "ok" | "failed"
  >("");
  const onSubmit = async (data: IEditProfileForm) => {
    if (editLoading) return;
    setEditLoading(true);

    const result = await client.mutate<
      EditProfileMutation,
      EditProfileMutationVariables
    >({
      mutation: EDIT_PROFILE_MUTATION,
      variables: {
        ...data,
      },
      refetchQueries: [
        {
          query: ME_QUERY,
        },
      ],
    });

    if (result.data?.editProfile.ok) {
      setEditNotification("ok");
      setTimeout(() => {
        setEditNotification("");
      }, 3000);
    } else {
      setEditNotification("failed");
      setTimeout(() => {
        setEditNotification("");
      }, 3000);
    }

    setEditLoading(false);
  };
  useEffect(() => {
    if (!loading) {
      setValue("firstName", data?.me.me?.firstName || "");
      setValue("lastName", data?.me.me?.lastName || "");
      setValue("bio", data?.me.me?.bio || "");
    }
  }, [loading, data, setValue]);

  // if (loading) return <Splash />;
  return (
    <>
      <div className="relative flex flex-col px-10 pt-16">
        {editNotification && (
          <div
            className={`absolute animate-fadeInUpDown left-1/3 ${
              editNotification === "ok" ? "bg-green-500" : "bg-red-500"
            } text-white flex justify-center items-center px-4 py-1 rounded-lg`}
          >
            {editNotification === "ok"
              ? t("editProfile:profileSaved")
              : t("editProfile:profileSaveFailed")}
          </div>
        )}
        <header>
          <h2 className="text-2xl font-medium">{t("shared:editProfile")}</h2>
        </header>
        <div className="flex flex-col my-20 gap-y-8">
          <div className="flex gap-x-10">
            <div className="w-40 flex flex-row-reverse">
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden flex justify-center items-center border">
                {imageLoading ? (
                  <CircularLoadingIndicator />
                ) : data?.me.me?.avatar ? (
                  <img
                    src={getPhotoUrl({
                      id: data?.me.me?.avatar,
                    })}
                    className="object-cover"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    size="2xl"
                    className="text-gray-500"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col justify-evenly font-medium">
              <span className="text-xl">{data?.me.me?.username}</span>
              <label htmlFor="avatar" className="relative">
                <input
                  onChange={onAvatarChange}
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="invisible absolute w-full h-full"
                />
                <span className="text-blue-500 cursor-pointer active:text-blue-300">
                  {t("editProfile:changeProfilePhoto")}
                </span>
              </label>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-10">
              <div className="flex gap-x-10">
                <div className="w-40 flex flex-row-reverse">
                  <span className=" font-bold">
                    {t("editProfile:firstName")}
                  </span>
                </div>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  className="px-2 py-1 outline-none rounded-md border dark:bg-black"
                />
              </div>
              <div className="flex gap-x-10">
                <div className="w-40 flex flex-row-reverse">
                  <span className=" font-bold">
                    {t("editProfile:lastName")}
                  </span>
                </div>
                <input
                  {...register("lastName")}
                  type="text"
                  className="px-2 py-1 outline-none rounded-md border dark:bg-black"
                />
              </div>
              <div className="flex gap-x-10">
                <div className="w-40 flex flex-row-reverse">
                  <span className=" font-bold">{t("editProfile:bio")}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <textarea
                    className="border p-2 dark:bg-black"
                    {...register("bio", {
                      maxLength: 150,
                      onChange: () => {
                        const bio = getValues("bio");
                        if (bio) {
                          setValue("bio", bio.slice(0, 150));
                        }
                      },
                    })}
                    cols={30}
                    rows={5}
                  ></textarea>
                  <span className="text-sm text-gray-400">
                    {watch("bio")?.length || 0}/150
                  </span>
                </div>
              </div>
              <div className="flex gap-x-10">
                <div className="w-40 flex flex-row-reverse"></div>
                <button
                  disabled={!isValid}
                  className={`px-4 py-1 rounded-md h-10 ${
                    isValid ? "bg-blue-500" : "bg-blue-300"
                  } active:bg-blue-400 text-white font-medium`}
                >
                  {editLoading ? (
                    <CircularLoadingIndicator />
                  ) : (
                    t("editProfile:submit")
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
