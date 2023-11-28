import { useState } from "react";
import client, { userInfoVar } from "../apollo";
import {
  FollowMutation,
  FollowMutationVariables,
  UnfollowMutation,
  UnfollowMutationVariables,
} from "../__generated__/graphql";
import {
  FOLLOW_MUTATION,
  PROFILE_QUERY,
  UNFOLLOW_MUTATION,
} from "../libs/queries";
import CircularLoadingIndicator from "./CircularLoadingIndicator";

interface IFollowButtonProps {
  username: string;
  children: React.ReactNode;
  isFollowing: boolean;
  followClassName?: string;
  unfollowClassName?: string;
}

function FollowButton({
  username,
  children,
  isFollowing,
  followClassName,
  unfollowClassName,
}: IFollowButtonProps) {
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const { username: me } = userInfoVar();

  const onFollowClick = async () => {
    if (followLoading) return;

    setFollowLoading(true);

    await client.mutate<FollowMutation, FollowMutationVariables>({
      mutation: FOLLOW_MUTATION,
      variables: {
        username,
      },
      update: (cache, { data }) => {
        if (data?.followUser.ok) {
          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing: () => true,
            },
          });
        }
      },
      refetchQueries: [
        {
          query: PROFILE_QUERY,
          variables: {
            username,
          },
        },
        {
          query: PROFILE_QUERY,
          variables: {
            username: me,
          },
        },
      ],
    });

    setFollowLoading(false);
  };

  const onUnfollowClick = async () => {
    if (followLoading) return;

    setFollowLoading(true);

    await client.mutate<UnfollowMutation, UnfollowMutationVariables>({
      mutation: UNFOLLOW_MUTATION,
      variables: {
        username,
      },
      update: (cache, { data }) => {
        if (data?.unfollowUser.ok) {
          cache.modify({
            id: `User:${username}`,
            fields: {
              isFollowing: () => false,
            },
          });
        }
      },
      refetchQueries: [
        {
          query: PROFILE_QUERY,
          variables: {
            username,
          },
        },
        {
          query: PROFILE_QUERY,
          variables: {
            username: me,
          },
        },
      ],
    });

    setFollowLoading(false);
  };

  if (isFollowing) {
    return (
      <button onClick={onUnfollowClick} className={unfollowClassName}>
        {followLoading ? <CircularLoadingIndicator size="sm" /> : children}
      </button>
    );
  }

  if (!isFollowing)
    return (
      <button onClick={onFollowClick} className={followClassName}>
        {followLoading ? <CircularLoadingIndicator size="sm" /> : children}
      </button>
    );
}

export default FollowButton;
