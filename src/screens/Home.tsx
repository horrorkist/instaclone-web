import { useQuery } from "@apollo/client";
import {
  HomeFeedQuery,
  HomeFeedQueryVariables,
} from "../__generated__/graphql";
import { HOME_FEED_QUERY } from "../libs/queries";
import Splash from "./Splash";
import NameCard from "../components/NameCard";
import { formatPhotoCreatedAt, getPhotoUrl } from "../libs/utils";
import { Helmet } from "react-helmet-async";
import InteractiveUsername from "../components/InteractiveUsername";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import CircularLoadingIndicator from "../components/CircularLoadingIndicator";
import { useEffect, useState } from "react";
import ToggleLikeButton from "../components/ToggleLikeButton";
import ModalOverlay from "../components/ModalOverlay";
import PostDetail from "./PostDetail";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation();
  const { loading, data, fetchMore, error } = useQuery<
    HomeFeedQuery,
    HomeFeedQueryVariables
  >(HOME_FEED_QUERY, {
    variables: {
      page: 1,
    },
    onCompleted(data) {
      data.getFeed.photos?.length === 0 && setReachEnd(true);
    },
  });

  const { setTarget, isVisible } = useIntersectionObserver();

  const [reachEnd, setReachEnd] = useState<boolean>(false);

  const [inModal, setInModal] = useState<boolean>(false);
  const [clickedPostId, setClickedPostId] = useState<number>(0);
  const closeModal = () => setInModal(false);

  useEffect(() => {
    if (isVisible && data?.getFeed.photos?.length) {
      fetchMore({
        variables: {
          page: Math.ceil(data?.getFeed.photos?.length / 10) + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return prev;
          }
          if (fetchMoreResult.getFeed.photos?.length === 0) {
            setReachEnd(true);
            return prev;
          }
          return {
            getFeed: {
              ...prev.getFeed,
              photos: [
                ...prev.getFeed.photos!,
                ...fetchMoreResult.getFeed.photos!,
              ],
            },
          };
        },
      });
    }
  }, [isVisible]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  if (loading) {
    return <Splash />;
  }

  return (
    <>
      <Helmet>
        <title>Instaclone</title>
      </Helmet>
      {inModal && (
        <ModalOverlay exit={closeModal}>
          <PostDetail postId={clickedPostId} exitPostDetail={closeModal} />
        </ModalOverlay>
      )}
      <div className="flex min-h-screen flex-col divide-y-2 bg-white dark:bg-black">
        {data?.getFeed.photos?.map((photo) => {
          return (
            <div
              key={photo?.id}
              className="py-2 flex flex-col w-[500px] font-medium text-dark dark:text-white"
            >
              <header className="flex gap-x-2 items-center py-2 font-bold">
                <NameCard
                  username={photo?.author.username || ""}
                  avatar={photo?.author.avatar || undefined}
                />
                <span className="text-black dark:text-white">&bull;</span>
                <span className="text-xs text-gray-400">
                  {formatPhotoCreatedAt(photo?.createdAt || "")}
                </span>
              </header>
              <div className="bg-black rounded-md overflow-hidden border">
                <img
                  src={getPhotoUrl({
                    id: photo?.url || "",
                  })}
                  className="object-center"
                />
              </div>
              <div className="flex py-2 gap-x-4">
                <ToggleLikeButton
                  postId={photo?.id || 0}
                  isLiked={photo?.isLiked || false}
                />
                {/* <button>
                  {photo?.isLiked ? (
                    <FontAwesomeIcon
                      icon={faSolidHeart}
                      size="xl"
                      className="text-red-500"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faRegularHeart} size="xl" />
                  )}
                </button> */}
              </div>
              <span className="">
                {photo?.likesCount.toLocaleString()} {t("postDetail:likes")}
              </span>
              {photo?.caption && (
                <div className="">
                  <InteractiveUsername
                    username={photo?.author.username || ""}
                  />
                  <span className="font-normal text-sm ml-1">
                    {photo?.caption}
                  </span>
                </div>
              )}
              <div>
                <button
                  onClick={() => {
                    setClickedPostId(photo?.id || 0);
                    setInModal(true);
                  }}
                >
                  <span className="text-gray-400 text-sm">
                    {photo?.commentsCount === 0 &&
                      t("postDetail:beTheFirstToComment")}
                    {photo?.commentsCount === 1 &&
                      t("postDetail:viewOneComment")}
                    {photo!.commentsCount > 1 === true &&
                      t("postDetail:viewAllComments", {
                        count: photo?.commentsCount,
                      })}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
        {!reachEnd && (
          <div
            ref={setTarget}
            className="flex justify-center items-center py-4"
          >
            <CircularLoadingIndicator size="lg" />
          </div>
        )}
        {reachEnd && (
          <div className="dark:text-white">you've all caught up.</div>
        )}
      </div>
    </>
  );
}

export default Home;
