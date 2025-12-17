import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PhotosQuery, PhotosQueryVariables } from "../__generated__/graphql";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHeart } from "@fortawesome/free-solid-svg-icons";
import ModalOverlay from "../components/ModalOverlay";
import CreatePostModal from "../components/Modals/createPostModal";
import { getPhotoUrl } from "../libs/utils";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import PostDetail from "./PostDetail";
import CircularLoadingIndicator from "../components/CircularLoadingIndicator";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { Helmet } from "react-helmet-async";
import { FEED_QUERY } from "../libs/queries";
import { useTranslation } from "react-i18next";

function Posts() {
  const { username } = useParams();

  if (!username) {
    throw new Error("Username is undefined");
  }

  const { t } = useTranslation();

  const [photos, setPhotos] = useState<any[]>([]);
  const [postId, setPostId] = useState<number>();

  const { isVisible, setTarget } = useIntersectionObserver();
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);

  const { loading, data, fetchMore } = useQuery<
    PhotosQuery,
    PhotosQueryVariables
  >(FEED_QUERY, {
    variables: {
      username,
      page: 1,
    },
    onCompleted: (data) => {
      if (data.getPhotos.ok && data.getPhotos.photos) {
        setPhotos((prev) => [...prev, ...data.getPhotos.photos!.flat()]);
      }
    },
  });

  useEffect(() => {
    async function fetchMorePhotos() {
      await fetchMore({
        variables: {
          page: Math.ceil(photos.length / 15) + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          if (!fetchMoreResult.getPhotos.ok) {
            return prev;
          }
          if (fetchMoreResult.getPhotos.photos?.length === 0) {
            setReachedEnd(true);
            return prev;
          }
          setPhotos([
            ...prev.getPhotos.photos!,
            ...fetchMoreResult.getPhotos.photos!,
          ]);
          return {
            getPhotos: {
              ...prev.getPhotos,
              photos: [
                ...prev.getPhotos.photos!,
                ...fetchMoreResult.getPhotos.photos!,
              ],
            },
          };
        },
      });
    }

    if (isVisible && !loading && !reachedEnd) {
      fetchMorePhotos();
    }
  }, [isVisible, loading, reachedEnd]);

  const [inModal, setInModal] = useState<"" | "create" | "post">("");

  const closeModal = () => setInModal("");

  const onCreateClick = () => setInModal("create");
  const onPostClick = (post: any) => {
    setPostId(post.id);
    setInModal("post");
  };

  if (loading)
    return (
      <div className="flex h-full justify-center items-center">
        <CircularLoadingIndicator size="lg" />
      </div>
    );

  if (photos.length == 0)
    return (
      <>
        {inModal === "create" && (
          <ModalOverlay exit={closeModal}>
            <CreatePostModal exit={closeModal} />
          </ModalOverlay>
        )}
        <div className="flex flex-col gap-y-4 items-center mt-20">
          <div
            onClick={onCreateClick}
            className="cursor-pointer w-16 h-16 rounded-full flex justify-center items-center border border-black dark:border-white"
          >
            <FontAwesomeIcon icon={faCamera} size="xl" />
          </div>
          <div className="text-center flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold">{t("profile:sharePhoto")}</h1>
            <p className="text-sm font-medium">{t("profile:whenYouShare")}</p>
            <strong
              onClick={onCreateClick}
              className="text-blue-500 hover:text-black dark:hover:text-gray-500 cursor-pointer"
            >
              {t("profile:shareFirst")}
            </strong>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Helmet>
        <title>{`@${username}`} &middot; InstaClone</title>
      </Helmet>
      {inModal === "post" && (
        <ModalOverlay exit={closeModal}>
          <PostDetail postId={postId!} exitPostDetail={closeModal} />
        </ModalOverlay>
      )}
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-1 pb-10">
          {data?.getPhotos?.photos?.map((photo) => {
            return (
              <div
                onClick={() => onPostClick(photo)}
                key={photo?.id}
                className="aspect-square flex relative group cursor-pointer overflow-hidden"
              >
                <img
                  src={getPhotoUrl({
                    id: photo!.url,
                  })}
                  className="object-cover w-full h-full block"
                  loading="lazy"
                />
                <div className="absolute inset-0 w-full h-full invisible group-hover:visible bg-black bg-opacity-30 flex items-center justify-center gap-x-4">
                  <div className="text-white flex gap-x-2 items-center">
                    <FontAwesomeIcon icon={faHeart} size="lg" />
                    <span className="text-2xl font-bold">
                      {photo?.likesCount}
                    </span>
                  </div>
                  <div className="text-white flex gap-x-2 items-center">
                    <FontAwesomeIcon icon={faComment} size="lg" />
                    <span className="text-2xl font-bold">
                      {photo?.commentsCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {!reachedEnd && (
          <div
            ref={setTarget}
            className="flex justify-center py-4 items-center"
          >
            <CircularLoadingIndicator size="lg" />
          </div>
        )}
      </div>
    </>
  );
}

export default Posts;
