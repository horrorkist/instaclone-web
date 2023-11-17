import { gql, useQuery } from "@apollo/client";
import { Outlet, useParams } from "react-router-dom";
import { UserQuery, UserQueryVariables } from "../__generated__/graphql";
import ProfileTabs from "../components/Profile/ProfileTabs";
import ProfileAvatar from "../components/Profile/ProfileAvatar";

const QUERY = gql`
  query user($username: String!) {
    getUserByUserName(username: $username) {
      ok
      error
      user {
        id
        firstName
        lastName
        username
        bio
        avatar
        photos {
          id
          url
          likesCount
          commentsCount
          isLiked
        }
        totalPhotos
        totalFollowing
        totalFollowers
        isMe
        isFollowing
      }
    }
  }
`;

function Profile() {
  const { username } = useParams();

  if (!username) {
    throw new Error("Username is undefined");
  }

  const { loading, data } = useQuery<UserQuery, UserQueryVariables>(QUERY, {
    variables: {
      username,
    },
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <main className="w-1/2 max-w-5xl ml-80 flex flex-col">
      <div className="flex gap-x-20 px-20 py-10 items-center">
        <ProfileAvatar />
        <div className="flex flex-col gap-y-4 flex-1">
          <div className="flex gap-x-6 items-center">
            <div className="h-10">
              <h1 className="text-2xl font-medium">
                {data?.getUserByUserName.user?.username}
              </h1>
            </div>
            <div className="h-10 flex items-center font-semibold">
              <button className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-400">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="flex gap-x-10">
            <div>
              <span className="font-semibold">
                {data?.getUserByUserName.user?.totalPhotos}
              </span>{" "}
              posts
            </div>
            <div>
              <span className="font-semibold">
                {data?.getUserByUserName.user?.totalFollowers}
              </span>{" "}
              followers
            </div>
            <div>
              <span className="font-semibold">
                {data?.getUserByUserName.user?.totalFollowing}
              </span>{" "}
              following
            </div>
          </div>
          <div className="line-clamp-3">
            <h1 className="font-bold">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et,
              pariatur. Earum molestiae ab adipisci dolorem maxime reprehenderit
              blanditiis itaque fugit, cumque accusamus ratione numquam
              voluptate et facilis quam in doloribus?
            </h1>
          </div>
        </div>
      </div>
      <ProfileTabs />
      <Outlet />
    </main>
  );
}

export default Profile;
