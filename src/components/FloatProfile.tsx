import { useQuery } from "@apollo/client";
import { UserQuery, UserQueryVariables } from "../__generated__/graphql";
import { PROFILE_QUERY } from "../libs/queries";
import CircularLoadingIndicator from "./CircularLoadingIndicator";
import { getPhotoUrl } from "../libs/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import FollowButton from "./FollowButton";
import routes from "../router/routes";
import { useTranslation } from "react-i18next";

function FloatProfile({ username }: { username: string }) {
  const { t } = useTranslation();
  const { loading, data } = useQuery<UserQuery, UserQueryVariables>(
    PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  if (loading) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <CircularLoadingIndicator size="lg" />;
      </div>
    );
  }

  if (!data?.getUserByUserName.user?.photos) {
    return (
      <div className="h-[400px] flex justify-center items-center">
        <h1 className="text-2xl font-medium">User not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full pt-4 text-black dark:text-white bg-white dark:bg-black">
      <Link to={`/${username}`} className="max-w-max">
        <header className="flex gap-x-4 items-center px-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center overflow-hidden">
            {data?.getUserByUserName.user?.avatar ? (
              <img
                src={getPhotoUrl({
                  id: data?.getUserByUserName.user?.avatar || "",
                })}
                className="object-cover"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                size="2xl"
                className="text-gray-400"
              />
            )}
          </div>
          <span className="text-xl font-semibold">{username}</span>
        </header>
      </Link>
      <div className="grid grid-cols-3 my-6">
        <span className="text-center">
          {data?.getUserByUserName.user?.totalPhotos}
          <br />
          {t("shared:posts")}
        </span>
        <span className="text-center">
          {data?.getUserByUserName.user?.totalFollowers}
          <br />
          {t("shared:followers")}
        </span>
        <span className="text-center">
          {data?.getUserByUserName.user?.totalFollowing}
          <br />
          {t("shared:following")}
        </span>
      </div>
      {data.getUserByUserName.user.photos.length === 0 ? (
        <div className="flex justify-center items-center h-[100px]">
          {t("floatProfile:noPosts")}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1">
          {data?.getUserByUserName.user?.photos.slice(0, 3).map((photo) => {
            return (
              <div key={photo!.id} className="aspect-square bg-black">
                <img
                  src={getPhotoUrl({
                    id: photo!.url,
                    variant: "post",
                  })}
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      )}
      <div className="flex justify-center items-center my-4 px-4">
        {data?.getUserByUserName.user?.isMe ? (
          <Link
            to={`${routes.settings}/${routes.editProfile}`}
            className="py-2 rounded-md w-full bg-blue-500 text-white text-center"
          >
            {t("shared:editProfile")}
          </Link>
        ) : (
          <FollowButton
            username={username}
            isFollowing={data.getUserByUserName.user.isFollowing}
            followClassName="py-2 h-10 rounded-md w-full bg-blue-500 text-white flex justify-center items-center"
            unfollowClassName="py-2 h-10 rounded-md w-full bg-gray-300 flex justify-center items-center"
          >
            {data.getUserByUserName.user.isFollowing
              ? t("shared:unfollow")
              : t("shared:follow")}
          </FollowButton>
        )}
      </div>
    </div>
  );
}

export default FloatProfile;
