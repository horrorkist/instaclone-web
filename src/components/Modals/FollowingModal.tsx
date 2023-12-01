import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NameCard from "../NameCard";
import { useQuery } from "@apollo/client";
import {
  FollowMutation,
  FollowMutationVariables,
  FollowingQuery,
  FollowingQueryVariables,
  UnfollowMutation,
  UnfollowMutationVariables,
} from "../../__generated__/graphql";
import {
  FOLLOWING_QUERY,
  FOLLOW_MUTATION,
  PROFILE_QUERY,
  UNFOLLOW_MUTATION,
} from "../../libs/queries";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import CircularLoadingIndicator from "../CircularLoadingIndicator";
import { useEffect, useState } from "react";
import client from "../../apollo";
import { useTranslation } from "react-i18next";

interface IFollowersModalProps {
  exit: () => void;
  username: string;
}

function FollowingModal({
  exit,
  username: profileUsername,
}: IFollowersModalProps) {
  const { loading, data, fetchMore } = useQuery<
    FollowingQuery,
    FollowingQueryVariables
  >(FOLLOWING_QUERY, {
    variables: {
      username: profileUsername,
    },
  });

  const { t } = useTranslation();
  const { setTarget, isVisible } = useIntersectionObserver();

  const [reachEnd, setReachEnd] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible && data?.getFollowing.following) {
      fetchMore({
        variables: {
          lastId: data.getFollowing.lastId,
        },

        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }

          if (!fetchMoreResult.getFollowing.following?.length) {
            setReachEnd(true);
            return prev;
          }

          return {
            getFollowing: {
              ...prev.getFollowing,
              lastId: fetchMoreResult.getFollowing.lastId,
              following: [
                ...prev.getFollowing.following!,
                ...fetchMoreResult.getFollowing.following!,
              ],
            },
          };
        },
      });
    }
  }, [isVisible, fetchMore]);

  const [followLoading, setFollowLoading] = useState<string | boolean>(false);

  const onFollowClick = async (username: string) => {
    if (followLoading) return;

    setFollowLoading(username);

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
            username: profileUsername,
          },
        },
      ],
    });

    setFollowLoading(false);
  };

  const onUnfollowClick = async (username: string) => {
    if (followLoading) return;

    setFollowLoading(username);

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
            username: profileUsername,
          },
        },
      ],
    });

    setFollowLoading(false);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-96 rounded-md bg-white dark:bg-black dark:text-white h-80 flex flex-col"
    >
      <header className="border-b text-center p-2 items-center">
        <h1 className="font-medium place-self-center m-auto inline">
          {t("shared:following")}
        </h1>
        <button onClick={exit} className="float-right px-1 h-full">
          <FontAwesomeIcon icon={faXmark} className="" />
        </button>
      </header>
      <div className="flex flex-col h-full overflow-scroll p-4 gap-y-4">
        {loading &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="flex gap-x-2">
              <div className="w-7 h-7 rounded-full bg-gray-300"></div>
              <div className="flex flex-col gap-y-2">
                <span className="w-40 rounded-md h-3 bg-gray-300"></span>
                <span className="w-24 rounded-md h-3 bg-gray-300"></span>
              </div>
              <div className="h-7 px-10 rounded-md bg-gray-300 ml-auto"></div>
            </div>
          ))}
        {!loading && data?.getFollowing.following?.length ? (
          <>
            {data?.getFollowing.following?.map((follower) => (
              <div key={follower?.id} className="flex justify-between">
                <NameCard
                  username={follower?.username || ""}
                  avatar={follower?.avatar || undefined}
                />
                {!follower?.isMe &&
                  (follower?.isFollowing ? (
                    <button
                      onClick={() => onUnfollowClick(follower?.username || "")}
                      className="py-1 px-4 whitespace-nowrap rounded-md w-20 bg-gray-300 text-sm font-semibold flex justify-center items-center"
                    >
                      {followLoading === follower?.username ? (
                        <CircularLoadingIndicator />
                      ) : (
                        t("shared:unfollow")
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => onFollowClick(follower?.username || "")}
                      className="py-1 px-4 whitespace-nowrap rounded-md w-20 bg-blue-500 text-white text-sm font-semibold flex justify-center items-center"
                    >
                      {followLoading === follower?.username ? (
                        <CircularLoadingIndicator />
                      ) : (
                        t("shared:follow")
                      )}
                    </button>
                  ))}
              </div>
            ))}
            {!reachEnd && (
              <div ref={setTarget} className="flex justify-center items-center">
                <CircularLoadingIndicator />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex justify-center items-center text-xl font-medium text-center px-10">
            {t("followingModal:noFollowing")}
          </div>
        )}
      </div>
    </div>
  );
}

export default FollowingModal;
