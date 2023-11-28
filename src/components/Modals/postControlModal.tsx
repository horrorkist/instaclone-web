import { useState } from "react";
import client from "../../apollo";
import {
  DeletePhotoMutation,
  DeletePhotoMutationVariables,
  EditPhotoMutation,
  EditPhotoMutationVariables,
} from "../../__generated__/graphql";
import {
  DELETE_POST_MUTATION,
  EDIT_POST_MUTATION,
  FEED_QUERY,
} from "../../libs/queries";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import constants from "../../libs/constants";

interface IPostControlModalProps {
  postId: number;
  exit: () => void;
  exitPostDetail: () => void;
  caption?: string;
}

interface IEditPostForm {
  caption: string;
}

function PostControlModal({
  postId,
  exit,
  exitPostDetail,
  caption,
}: IPostControlModalProps) {
  const { username } = useParams();

  const [controlStatus, setControlStatus] = useState<"" | "delete" | "edit">(
    ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onDeleteClick = async () => {
    if (loading) return;

    setLoading(true);

    // delete post

    await client.mutate<DeletePhotoMutation, DeletePhotoMutationVariables>({
      mutation: DELETE_POST_MUTATION,
      variables: {
        id: postId,
      },
      refetchQueries: [
        {
          query: FEED_QUERY,
          variables: {
            username,
            page: 1,
          },
        },
      ],
    });

    setLoading(false);

    exitPostDetail();
  };

  const { handleSubmit, register, watch, setValue, getValues } =
    useForm<IEditPostForm>({
      defaultValues: {
        caption,
      },
    });

  const onEditSubmit = async ({ caption }: IEditPostForm) => {
    if (loading) return;

    setLoading(true);

    await client.mutate<EditPhotoMutation, EditPhotoMutationVariables>({
      mutation: EDIT_POST_MUTATION,
      variables: {
        id: postId,
        caption: caption || "",
      },
      update: (cache, result) => {
        if (result.data?.editPhoto.ok) {
          cache.modify({
            id: `Photo:${postId}`,
            fields: {
              caption() {
                return caption || "";
              },
            },
          });
        }
      },
    });

    setLoading(false);

    exit();
  };

  if (controlStatus === "delete") {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-md bg-white w-60 divide-y-2"
      >
        <div className="p-4 flex justify-center items-center w-full">
          Delete Post?
        </div>
        <div className="flex divide-x-2">
          <button
            onClick={onDeleteClick}
            className="p-4 flex justify-center items-center w-full text-red-500"
          >
            {loading ? <CircularLoadingIndicator /> : "Delete"}
          </button>
          <button
            onClick={() => setControlStatus("")}
            className="p-4 flex justify-center items-center w-full"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  if (controlStatus === "edit") {
    return (
      <form
        onSubmit={handleSubmit(onEditSubmit)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-md bg-white w-[500px] divide-y-2"
      >
        <div className="p-4 flex justify-center items-center w-full font-medium">
          Caption Edit
        </div>
        <div className="flex flex-col">
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
            className="p-4 resize-none outline-none h-64"
            placeholder="Please write caption..."
          ></textarea>
          <div className="text-right p-2 text-gray-400 font-medium">{`${
            watch("caption").length
          }/${constants.MAX_CAPTION_LIMIT}`}</div>
        </div>
        <div className="flex divide-x-2">
          <button className="p-4 flex justify-center items-center w-full text-blue-500">
            {loading ? <CircularLoadingIndicator /> : "Edit"}
          </button>
          <button
            onClick={() => setControlStatus("")}
            className="p-4 flex justify-center items-center w-full"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex flex-col rounded-md bg-white w-60 divide-y-2"
    >
      <button
        onClick={() => setControlStatus("delete")}
        className="p-4 flex justify-center items-center w-full text-red-500"
      >
        Delete
      </button>
      <button
        onClick={() => setControlStatus("edit")}
        className="p-4 flex justify-center items-center w-full"
      >
        Edit
      </button>
      <button
        onClick={exit}
        className="p-4 flex justify-center items-center w-full"
      >
        Cancel
      </button>
    </div>
  );
}

export default PostControlModal;
