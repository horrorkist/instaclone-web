import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { PhotosQuery, PhotosQueryVariables } from "../__generated__/graphql";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import ModalOverlay from "../components/ModalOverlay";
import CreatePostModal from "../components/Modals/createPostModal";

const FEED_QUERY = gql`
  query photos($username: String!, $page: Int!) {
    getPhotos(username: $username, page: $page) {
      ok
      error
      photos {
        id
        author {
          id
        }
        url
        caption
        likesCount
        commentsCount
        isLiked
        isMine
        createdAt
        updatedAt
      }
    }
  }
`;

function Posts() {
  const { username } = useParams();

  if (!username) {
    throw new Error("Username is undefined");
  }

  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<any[]>([]);

  const { loading, data } = useQuery<PhotosQuery, PhotosQueryVariables>(
    FEED_QUERY,
    {
      variables: {
        username,
        page,
      },
      onCompleted: (data) => {
        if (data.getPhotos.ok && data.getPhotos.photos) {
          setPhotos((prev) => [...prev, ...[data.getPhotos.photos]]);
        }
      },
    }
  );

  const [inModal, setInModal] = useState<boolean>(false);

  const closeModal = () => setInModal(false);

  const onClick = () => setInModal((prev) => !prev);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <h1>Loading...</h1>;

  if (photos.length !== 0)
    return (
      <>
        {inModal && (
          <ModalOverlay exit={closeModal}>
            <CreatePostModal exit={closeModal} />
          </ModalOverlay>
        )}
        <div className="flex flex-col gap-y-4 items-center mt-20">
          <div
            onClick={onClick}
            className="cursor-pointer w-16 h-16 rounded-full flex justify-center items-center border border-black "
          >
            <FontAwesomeIcon icon={faCamera} size="xl" />
          </div>
          <div className="text-center flex flex-col gap-y-4">
            <h1 className="text-3xl font-bold">Share Photos</h1>
            <p className="text-sm font-medium">
              when you share your photos, they will appear on your profile.
            </p>
            <strong
              onClick={onClick}
              className="text-blue-500 hover:text-black cursor-pointer"
            >
              Share your first photo
            </strong>
          </div>
        </div>
      </>
    );

  return <div>asdf</div>;
}

export default Posts;
