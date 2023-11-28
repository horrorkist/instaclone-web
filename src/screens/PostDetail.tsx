import { useQuery } from "@apollo/client";
import client from "../apollo";
import { formatPhotoCreatedAt, getPhotoUrl } from "../libs/utils";
import NameCard from "../components/NameCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  COMMENTS_QUERY,
  CREATE_COMMENT_MUTATION,
  POST_QUERY,
} from "../libs/queries";
import {
  CommentsQuery,
  CommentsQueryVariables,
  CreateCommentMutation,
  CreateCommentMutationVariables,
  PhotoQuery,
  PhotoQueryVariables,
} from "../__generated__/graphql";
import Comment from "../components/Comment";
import CircularLoadingIndicator from "../components/CircularLoadingIndicator";
import ModalOverlay from "../components/ModalOverlay";
import PostControlModal from "../components/Modals/postControlModal";
import ToggleLikeButton from "../components/ToggleLikeButton";

interface ICommentForm {
  comment: string;
}

function PostDetail({
  postId,
  exitPostDetail,
}: {
  postId: number;
  exitPostDetail: () => void;
}) {
  const { loading: postLoading, data: postData } = useQuery<
    PhotoQuery,
    PhotoQueryVariables
  >(POST_QUERY, {
    variables: {
      id: postId,
    },
  });

  // comment

  // const [comments, setComments] = useState<any[]>([]);
  const [loadMoreCommentsLoading, setLoadMoreCommentsLoading] =
    useState<boolean>(false);
  const [reachedCommentEnd, setReachedCommentEnd] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<ICommentForm>();

  const [contentRef, setContentRef] = useState<HTMLDivElement | null>(null);
  const [commentBoxRef, setCommentBoxRef] = useState<HTMLDivElement | null>(
    null
  );

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    if (e.target.scrollHeight <= 40) e.target.style.height = "24px";
    else e.target.style.height = e.target.scrollHeight + "px";

    const $parent = e.currentTarget.parentElement?.parentElement?.parentElement;
    const target = e.currentTarget.parentElement?.parentElement?.parentElement
      ?.parentElement?.children[1] as HTMLDivElement;

    target.style.paddingBottom = $parent!.scrollHeight! + 20 + "px";
  };

  const { data: commentsData, fetchMore } = useQuery<
    CommentsQuery,
    CommentsQueryVariables
  >(COMMENTS_QUERY, {
    variables: {
      photoId: postId,
      skip: 0,
    },
  });

  useEffect(() => {
    if (contentRef && commentBoxRef) {
      contentRef.style.paddingBottom = commentBoxRef.scrollHeight + 20 + "px";
    }
  }, [contentRef, commentBoxRef]);

  const onLoadMoreComment = async () => {
    if (loadMoreCommentsLoading) return;
    setLoadMoreCommentsLoading(true);
    await fetchMore({
      variables: {
        skip: commentsData?.getPhotoComments.comments?.length || 0,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (!fetchMoreResult.getPhotoComments.ok) {
          return prev;
        }
        if (fetchMoreResult.getPhotoComments.comments?.length === 0) {
          setReachedCommentEnd(true);
          return prev;
        }
        return {
          getPhotoComments: {
            ...prev.getPhotoComments,
            comments: [
              ...prev.getPhotoComments.comments!,
              ...fetchMoreResult.getPhotoComments.comments!,
            ],
          },
        };
      },
    });
    setLoadMoreCommentsLoading(false);
  };

  const [submitCommentLoading, setSubmitCommentLoading] =
    useState<boolean>(false);
  const onSubmitComment = async (data: ICommentForm) => {
    if (submitCommentLoading) return;

    setSubmitCommentLoading(true);

    // submit comment

    const payload = data.comment;

    await client.mutate<CreateCommentMutation, CreateCommentMutationVariables>({
      mutation: CREATE_COMMENT_MUTATION,
      variables: {
        photoId: postId,
        payload,
      },
      update: (cache, result) => {
        if (result.data?.createComment.ok) {
          cache.modify({
            id: `Photo:${postId}`,
            fields: {
              commentsCount(prev) {
                return prev + 1;
              },
            },
          });
          const readQuery = cache.readQuery<
            CommentsQuery,
            CommentsQueryVariables
          >({
            query: COMMENTS_QUERY,
            variables: {
              photoId: postId,
              skip: 0,
            },
          });

          cache.writeQuery<CommentsQuery, CommentsQueryVariables>({
            query: COMMENTS_QUERY,
            variables: {
              photoId: postId,
              skip: 0,
            },
            data: {
              getPhotoComments: {
                ...readQuery!.getPhotoComments,
                comments: [
                  result.data.createComment.comment!,
                  ...readQuery!.getPhotoComments.comments!,
                ],
              },
            },
          });
        }
      },
    });

    reset();
    setSubmitCommentLoading(false);
  };

  // modal

  const [inModal, setInModal] = useState<boolean>(false);

  const closeModal = () => setInModal(false);

  if (postLoading) {
    return <CircularLoadingIndicator size="lg" />;
  }

  if (!postData || !postData.getPhoto.photo) {
    return null;
  }

  return (
    <>
      {inModal && (
        <ModalOverlay exit={closeModal}>
          <PostControlModal
            postId={postId}
            exit={closeModal}
            exitPostDetail={exitPostDetail}
            caption={postData?.getPhoto.photo?.caption || ""}
          />
        </ModalOverlay>
      )}
      <div className="w-11/12 aspect-video max-h-[96%] flex justify-center items-center">
        <div
          onClick={(e) => e.stopPropagation()}
          className="h-full max-w-[1196px] max-h-[1196px] aspect-square border-r bg-white"
        >
          <img
            src={getPhotoUrl({
              id: postData?.getPhoto.photo?.url || "",
              variant: "post",
            })}
            className="object-cover"
          />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative h-full flex-1 rounded-tr-md rounded-br-md bg-white max-w-[500px] flex flex-col"
        >
          <div className="flex justify-between items-center">
            <div className="p-4">
              <NameCard
                username={postData?.getPhoto.photo!.author.username || ""}
                avatar={postData?.getPhoto.photo!.author.avatar || undefined}
              />
            </div>
            <div className="p-4">
              {postData?.getPhoto.photo?.author.isMe && (
                <button
                  onClick={() => setInModal(true)}
                  className="px-4 hover:text-gray-300 active:text-gray-400"
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </button>
              )}
            </div>
          </div>
          <div
            ref={setContentRef}
            className="border-t flex-1 overflow-scroll flex flex-col items-center p-4 gap-y-5"
          >
            <Comment
              id={postData?.getPhoto.photo?.id}
              payload={postData?.getPhoto.photo?.caption || ""}
              username={postData?.getPhoto.photo?.author.username}
              avatar={postData?.getPhoto.photo?.author.avatar || undefined}
              createdAt={postData?.getPhoto.photo?.createdAt}
              updatedAt={postData?.getPhoto.photo?.updatedAt}
            />
            {commentsData?.getPhotoComments?.comments?.map((comment) => {
              if (comment) {
                return (
                  <Comment
                    id={comment.id}
                    key={comment.id}
                    payload={comment.payload}
                    isMine={comment.isMine}
                    username={comment.author.username}
                    avatar={comment.author.avatar || undefined}
                    createdAt={comment.createdAt}
                    updatedAt={comment.updatedAt}
                    photoId={postId}
                  />
                );
              }
            })}
            {!reachedCommentEnd &&
              (loadMoreCommentsLoading ? (
                <div>
                  <CircularLoadingIndicator />
                </div>
              ) : (
                <button
                  onClick={onLoadMoreComment}
                  className="flex justify-center items-center border-2 border-black rounded-full w-6 h-6 p-2"
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              ))}
          </div>
          <div
            ref={setCommentBoxRef}
            className="absolute bottom-0 w-full bg-white"
          >
            <div className="p-4 flex flex-col gap-y-4 border-y">
              <div className="flex items-center gap-x-5">
                <ToggleLikeButton
                  isLiked={postData.getPhoto.photo.isLiked}
                  postId={postId}
                />
                <button>
                  <FontAwesomeIcon icon={faComment} size="xl" />
                </button>
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {postData.getPhoto.photo.likesCount.toLocaleString()} likes
                </span>
                <span className="text-xs text-gray-400">
                  {formatPhotoCreatedAt(postData.getPhoto.photo.createdAt)}
                </span>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onSubmitComment)}
              className="flex items-center font-medium"
            >
              <div className="p-4">
                <FontAwesomeIcon icon={faFaceSmile} size="xl" />
              </div>
              <div className="flex-1 flex items-center">
                <textarea
                  {...register("comment", { required: true, onChange })}
                  rows={1}
                  className="w-full max-h-24 h-6 outline-none resize-none overflow-scroll"
                  placeholder="Add a comment..."
                ></textarea>
              </div>
              {submitCommentLoading ? (
                <div className="p-4">
                  <CircularLoadingIndicator />
                </div>
              ) : (
                <button
                  disabled={!isValid}
                  className={`${
                    !isValid
                      ? "text-gray-300"
                      : "text-blue-500 active:text-blue-300"
                  } p-4 `}
                >
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetail;
