import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import client from "../apollo";
import {
  ToggleLikeMutation,
  ToggleLikeMutationVariables,
} from "../__generated__/graphql";
import { TOGGLE_LIKE_MUTATION } from "../libs/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ToggleLikeButton({
  postId,
  isLiked,
}: {
  postId: number;
  isLiked: boolean;
}) {
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const onLikeClick = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    await client.mutate<ToggleLikeMutation, ToggleLikeMutationVariables>({
      mutation: TOGGLE_LIKE_MUTATION,
      variables: {
        photoId: postId,
      },
      update: (cache, result) => {
        if (result.data?.toggleLike.ok) {
          const photoId = `Photo:${postId}`;
          cache.modify({
            id: photoId,
            fields: {
              isLiked(prev) {
                return !prev;
              },
              likesCount(prev) {
                if (isLiked) return prev - 1;
                else return prev + 1;
              },
            },
          });
        }
      },
    });

    setLikeLoading(false);
  };
  return (
    <button onClick={onLikeClick}>
      {isLiked ? (
        <FontAwesomeIcon
          icon={faHeartSolid}
          size="xl"
          className="text-red-500"
        />
      ) : (
        <FontAwesomeIcon
          icon={faHeartRegular}
          size="xl"
          className="text-black dark:text-white"
        />
      )}
    </button>
  );
}

export default ToggleLikeButton;
