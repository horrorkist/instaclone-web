import { useQuery } from "@apollo/client";
import { Link, Outlet, useParams } from "react-router-dom";
import { UserQuery, UserQueryVariables } from "../__generated__/graphql";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileAvatar from "../components/Profile/ProfileAvatar";
import Splash from "./Splash";
import { PROFILE_QUERY } from "../libs/queries";
import { useState } from "react";
import ModalOverlay from "../components/ModalOverlay";
import FollowersModal from "../components/Modals/FollowersModal";
import FollowingModal from "../components/Modals/FollowingModal";
import FollowButton from "../components/FollowButton";
import routes from "../router/routes";

function Profile() {
  const { username } = useParams();

  if (!username) {
    throw new Error("Username is undefined");
  }

  const { loading, data } = useQuery<UserQuery, UserQueryVariables>(
    PROFILE_QUERY,
    {
      variables: {
        username,
      },
    }
  );

  const [inModal, setInModal] = useState<"" | "followers" | "following">("");

  const closeModal = () => setInModal("");

  if (loading) {
    return <Splash />;
  }

  if (data?.getUserByUserName.ok === false) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-medium">User not found</h1>
      </div>
    );
  }

  return (
    <>
      {inModal === "followers" && (
        <ModalOverlay exit={closeModal}>
          <FollowersModal username={username} exit={closeModal} />
        </ModalOverlay>
      )}
      {inModal === "following" && (
        <ModalOverlay exit={closeModal}>
          <FollowingModal username={username} exit={closeModal} />
        </ModalOverlay>
      )}
      <main className="w-1/2 min-h-screen max-w-5xl ml-80 flex flex-col">
        <div className="flex gap-x-20 px-20 py-10 items-center">
          <ProfileAvatar
            id={data?.getUserByUserName.user?.avatar}
            isMe={data?.getUserByUserName.user?.isMe || false}
          />
          <div className="flex flex-col gap-y-4 flex-1">
            <div className="flex gap-x-6 items-center">
              <div className="h-10">
                <h1 className="text-2xl font-medium">
                  {data?.getUserByUserName.user?.username}
                </h1>
              </div>
              <div className="h-10 flex items-center gap-x-4 font-semibold">
                {data?.getUserByUserName.user?.isMe ? (
                  <Link
                    to={`${routes.settings}/${routes.editProfile}`}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-400"
                  >
                    Edit Profile
                  </Link>
                ) : (
                  <>
                    <FollowButton
                      username={username}
                      isFollowing={
                        data?.getUserByUserName.user?.isFollowing || false
                      }
                      followClassName="px-3 py-1 min-w-[80px] h-8 text-white rounded-md bg-blue-400 hover:bg-blue-500 flex justify-center items-center"
                      unfollowClassName="px-3 py-1 min-w-[80px] h-8 text-black rounded-md bg-gray-200 hover:bg-gray-400 flex justify-center items-center"
                    >
                      {data?.getUserByUserName.user?.isFollowing
                        ? "Unfollow"
                        : "Follow"}
                    </FollowButton>
                    <button className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-400">
                      Message
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-x-10">
              <div>
                <span className="font-semibold">
                  {data?.getUserByUserName.user?.totalPhotos}
                </span>{" "}
                posts
              </div>
              <button onClick={() => setInModal("followers")}>
                <span className="font-semibold">
                  {data?.getUserByUserName.user?.totalFollowers}
                </span>{" "}
                followers
              </button>
              <button onClick={() => setInModal("following")}>
                <span className="font-semibold">
                  {data?.getUserByUserName.user?.totalFollowing}
                </span>{" "}
                following
              </button>
            </div>
            <div className="line-clamp-3">
              <h1 className="font-bold">{data?.getUserByUserName.user?.bio}</h1>
            </div>
          </div>
        </div>
        <ProfileTabs />
        <Outlet />
      </main>
    </>
  );
}

export default Profile;
