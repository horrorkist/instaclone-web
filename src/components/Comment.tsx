import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatPhotoCreatedAt } from "../libs/utils";
import Avatar from "./Avatar";
import InteractiveUsername from "./InteractiveUsername";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import client from "../apollo";
import {
  DeleteCommentMutation,
  DeleteCommentMutationVariables,
} from "../__generated__/graphql";
import { DELETE_COMMENT_MUTATION } from "../libs/queries";

interface ICommentProps {
  id: number;
  username: string;
  avatar?: string;
  payload: string;
  isMine?: boolean;
  photoId?: number;
  createdAt: string;
  updatedAt: string;
}

function Comment({
  id,
  username,
  avatar,
  payload,
  isMine,
  createdAt,
  photoId,
}: ICommentProps) {
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);

  const onDelete = async () => {
    if (deleteLoading) return;

    setDeleteLoading(true);

    // delete comment

    await client.mutate<DeleteCommentMutation, DeleteCommentMutationVariables>({
      mutation: DELETE_COMMENT_MUTATION,
      variables: {
        id,
      },
      update: (cache, result) => {
        if (result.data?.deleteComment.ok) {
          cache.evict({ id: `Comment:${id}` });
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              commentsCount(prev) {
                console.log(prev);
                return prev - 1;
              },
            },
          });
        }
      },
    });

    setDeleteLoading(false);
  };

  return (
    <div className="flex justify-between w-full items-start">
      <div className="w-full items-start flex gap-x-3">
        <div>
          <Avatar avatar={avatar} />
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="leading-3">
            <InteractiveUsername username={username} />
            &nbsp;
            <span className="text-sm">{payload}</span>
          </div>
          <span className="text-xs text-gray-400">
            {formatPhotoCreatedAt(createdAt)}
          </span>
        </div>
      </div>
      {isMine && (
        <button
          onClick={onDelete}
          className="hover:text-gray-300 active:text-gray-400"
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
    </div>
  );
}

export default Comment;
