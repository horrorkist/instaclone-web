import {
  faCircleXmark,
  faFaceSmile,
  faImage,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheckCircle,
  faChevronDown,
  faLocationDot,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  UploadPhotoMutation,
  UploadPhotoMutationVariables,
  UploadUrlQuery,
} from "../../__generated__/graphql";
import {
  FEED_QUERY,
  UPLOAD_POST_MUTATION,
  UPLOAD_URL_QUERY,
} from "../../libs/queries";
import client, { userInfoVar } from "../../apollo";
import { uploadImage } from "../../libs/api";
import NameCard from "../NameCard";
import useUser from "../../hooks/useUser";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import constants from "../../libs/constants";

interface IUploadPhotoForm {
  file: FileList;
  caption?: string;
}

function CreatePostModal({ exit }: { exit: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
    getValues,
    setValue,
  } = useForm<IUploadPhotoForm>();
  const [accessibilityExpanded, setAccessibilityExpanded] =
    useState<boolean>(false);
  const [advancedSettingsExpanded, setAdvancedSettingsExpanded] =
    useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const { data, loading } = useUser();

  const [status, setStatus] = useState<
    "idle" | "loading" | "completed" | "failed"
  >("idle");

  useEffect(() => {
    if (!loading && data && data.me?.ok === false) {
      alert("You need to log in to upload a photo.");
      exit();
    }
  }, [loading, data, exit]);

  const onSubmit = async (data: IUploadPhotoForm) => {
    setStatus("loading");
    const {
      data: { getUploadUrl: url },
    } = await client.query<UploadUrlQuery>({
      query: UPLOAD_URL_QUERY,
      fetchPolicy: "no-cache",
    });

    const file = data.file[0];
    const {
      result: { id },
    } = await uploadImage(file, url);

    const { data: uploadPostResponse } = await client.mutate<
      UploadPhotoMutation,
      UploadPhotoMutationVariables
    >({
      mutation: UPLOAD_POST_MUTATION,
      variables: {
        url: id,
        caption: data.caption,
      },
      refetchQueries: [
        {
          query: FEED_QUERY,
          variables: {
            username: userInfoVar().username,
            page: 1,
          },
        },
      ],
    });

    if (uploadPostResponse?.uploadPhoto.ok === false) {
      console.log(uploadPostResponse.uploadPhoto.error);
      setStatus("failed");
      return;
    }

    setStatus("completed");
  };

  if (loading) {
    return <CircularLoadingIndicator size="lg" />;
  }

  if (data?.me?.ok)
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[1200px] h-[900px] rounded-xl overflow-hidden bg-white flex flex-col relative animate-fade-in"
      >
        {(status === "loading" ||
          status === "completed" ||
          status === "failed") && (
          <div className="absolute w-full h-full inset-0 bg-white flex justify-center items-center z-10">
            {status === "loading" && (
              <div className="relative w-40 h-40 bg-gradient-to-br from-amber-200 via-red-300 to-violet-500 flex justify-center items-center rounded-full">
                <div className="w-[150px] h-[150px] rounded-full bg-white"></div>
                <svg className="w-full h-full absolute inset-0 animate-spin">
                  <circle
                    cx={80}
                    cy={80}
                    r={78}
                    stroke="currentColor"
                    strokeWidth={8}
                    fill="transparent"
                    className="text-white"
                    strokeDasharray={((2 * 22) / 7) * 80}
                    strokeDashoffset={((2 * 22) / 7) * 80 * 0.8}
                  ></circle>
                </svg>
              </div>
            )}
            {status === "completed" && (
              <div className="flex flex-col gap-y-8">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  size="9x"
                  className="text-green-500"
                />
                <button
                  onClick={exit}
                  className="px-4 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white"
                >
                  Photo uploaded
                </button>
              </div>
            )}
            {status === "failed" && (
              <div className="flex flex-col gap-y-8">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  size="9x"
                  className="text-red-500"
                />
                <button
                  onClick={exit}
                  className="px-4 py-2 rounded-lg bg-red-400 hover:bg-red-500 active:bg-red-300 text-white"
                >
                  Failed to upload
                </button>
              </div>
            )}
          </div>
        )}
        <header className="flex justify-between px-4 py-2 border-b flex-1 items-center font-medium">
          <button
            onClick={exit}
            className="flex justify-center items-center active:text-gray-300"
          >
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </button>
          <div className="select-none">Create New Post</div>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={!isValid}
            className={`${
              isValid
                ? "text-blue-500 hover:text-black active:text-gray-300 cursor-pointer"
                : "text-gray-300 cursor-default"
            }`}
          >
            Share
          </button>
        </header>
        <main className="flex">
          <div className="w-[855px] h-[855px] border-r flex justify-center items-center">
            {preview ? (
              <img src={preview} className="object-cover" />
            ) : (
              <div className="flex flex-col gap-y-4 items-center">
                <FontAwesomeIcon
                  icon={faImage}
                  size="6x"
                  className="text-gray-500"
                />
                <span className="font-medium">Upload your photo</span>
                <label
                  htmlFor="file"
                  className="flex justify-center items-center relative"
                >
                  <input
                    {...register("file", {
                      required: true,
                      onChange: handleChange,
                    })}
                    id="file"
                    type="file"
                    accept="image/*"
                    className="invisible absolute
                "
                  />
                  <div className="select-none cursor-pointer rounded-md px-4 py-2 bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white font-semibold">
                    Select from computer
                  </div>
                </label>
              </div>
            )}
          </div>
          <div className="flex flex-col flex-1 font-medium">
            <div className="p-4">
              <NameCard
                username={data.me.me!.username!}
                avatar={data.me.me!.avatar || undefined}
              />
            </div>
            <textarea
              {...register("caption", {
                maxLength: constants.MAX_CAPTION_LIMIT,
                onChange: () => {
                  const caption = getValues("caption");
                  if (caption && caption.length > constants.MAX_CAPTION_LIMIT) {
                    setValue(
                      "caption",
                      caption.slice(0, constants.MAX_CAPTION_LIMIT)
                    );
                  }
                },
              })}
              className="px-4 resize-none outline-none"
              cols={30}
              rows={10}
              placeholder="Write a caption..."
            ></textarea>
            <div className="flex justify-between items-center p-4 border-b text-gray-400">
              <FontAwesomeIcon icon={faFaceSmile} size="lg" />
              <span className="text-sm">
                {watch("caption")?.length}/
                {constants.MAX_CAPTION_LIMIT.toLocaleString()}
              </span>
            </div>
            <div className="p-3 flex justify-between items-center text-gray-500 border-b">
              <span className="">Add Location Not Supported</span>
              <FontAwesomeIcon icon={faLocationDot} size="lg" />
            </div>
            <div className="p-3 flex flex-col gap-y-4 border-b">
              <div className="flex justify-between items-center">
                <span className="">Accessibility</span>
                <button
                  className={`${accessibilityExpanded && "rotate-180"}`}
                  onClick={() => setAccessibilityExpanded((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faChevronDown} size="lg" />
                </button>
              </div>
              {accessibilityExpanded && <span>Not Supported</span>}
            </div>
            <div className="p-3 flex flex-col gap-y-4 border-b">
              <div className="flex justify-between items-center">
                <span className="">Advanced Settings</span>
                <button
                  className={`${advancedSettingsExpanded && "rotate-180"}`}
                  onClick={() => setAdvancedSettingsExpanded((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faChevronDown} size="lg" />
                </button>
              </div>
              {advancedSettingsExpanded && <span>Not Supported</span>}
            </div>
          </div>
        </main>
      </div>
    );
}

export default CreatePostModal;
