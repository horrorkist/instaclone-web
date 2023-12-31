import { gql } from "@apollo/client";

export const UPLOAD_URL_QUERY = gql`
  query uploadUrl {
    getUploadUrl
  }
`;

export const UPLOAD_POST_MUTATION = gql`
  mutation uploadPhoto($url: String!, $caption: String) {
    uploadPhoto(url: $url, caption: $caption) {
      ok
      error
    }
  }
`;

export const COMMENTS_QUERY = gql`
  query comments($photoId: Int!, $skip: Int!) {
    getPhotoComments(id: $photoId, skip: $skip) {
      ok
      error
      comments {
        id
        author {
          username
          avatar
        }
        photo {
          id
        }
        payload
        isMine
        createdAt
        updatedAt
      }
    }
  }
`;

export const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
      comment {
        id
        author {
          username
          avatar
        }
        photo {
          id
        }
        payload
        isMine
        createdAt
        updatedAt
      }
    }
  }
`;

export const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
      error
    }
  }
`;

export const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($photoId: Int!) {
    toggleLike(photoId: $photoId) {
      ok
      error
    }
  }
`;

export const FOLLOW_MUTATION = gql`
  mutation follow($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

export const UNFOLLOW_MUTATION = gql`
  mutation unfollow($username: String!) {
    unfollowUser(username: $username) {
      ok
      error
    }
  }
`;

export const FEED_QUERY = gql`
  query photos($username: String!, $page: Int!) {
    getPhotos(username: $username, page: $page) {
      ok
      error
      photos {
        id
        author {
          id
          username
          avatar
          isMe
          isFollowing
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

export const PROFILE_QUERY = gql`
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

export const DELETE_POST_MUTATION = gql`
  mutation deletePhoto($id: Int!) {
    deletePhoto(id: $id) {
      ok
      error
    }
  }
`;

export const EDIT_POST_MUTATION = gql`
  mutation editPhoto($id: Int!, $caption: String!) {
    editPhoto(id: $id, caption: $caption) {
      ok
      error
    }
  }
`;

export const POST_QUERY = gql`
  query photo($id: Int!) {
    getPhoto(id: $id) {
      ok
      error
      photo {
        id
        author {
          id
          username
          avatar
          isMe
          isFollowing
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

export const FOLLOWERS_QUERY = gql`
  query followers($username: String!, $page: Int!) {
    getFollowers(username: $username, page: $page) {
      ok
      error
      followers {
        id
        username
        avatar
        isFollowing
        isMe
      }
    }
  }
`;
export const FOLLOWING_QUERY = gql`
  query following($username: String!, $lastId: Int) {
    getFollowing(username: $username, lastId: $lastId) {
      ok
      error
      lastId
      following {
        id
        username
        avatar
        isFollowing
        isMe
      }
    }
  }
`;

export const HOME_FEED_QUERY = gql`
  query homeFeed($page: Int!) {
    getFeed(page: $page) {
      ok
      error
      photos {
        id
        author {
          id
          username
          avatar
          isMe
          isFollowing
        }
        url
        createdAt
        updatedAt
        caption
        likesCount
        commentsCount
        isLiked
      }
    }
  }
`;

export const SEARCH_USERS_QUERY = gql`
  query searchUsers($keyword: String!, $lastId: Int) {
    searchUsers(keyword: $keyword, lastId: $lastId) {
      ok
      error
      lastId
      users {
        id
        username
        avatar
        isFollowing
        isMe
        totalFollowers
        firstName
        lastName
      }
    }
  }
`;

export const EDIT_AVATAR_MUTATION = gql`
  mutation editAvatar($avatar: String) {
    editProfile(avatar: $avatar) {
      ok
      error
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      ok
      me {
        username
        email
        firstName
        lastName
        avatar
        bio
      }
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($firstName: String, $lastName: String, $bio: String) {
    editProfile(firstName: $firstName, lastName: $lastName, bio: $bio) {
      ok
      error
    }
  }
`;

export const DIRECT_ROOMS_QUERY = gql`
  query directRooms {
    getRooms {
      ok
      error
      rooms {
        id
        users {
          id
          username
          avatar
          isMe
        }
        lastMessage {
          id
          payload
          createdAt
        }
        unreadMessagesCount
      }
    }
  }
`;

export const DIRECT_ROOM_QUERY = gql`
  query directRoom($id: Int!) {
    getRoom(id: $id) {
      ok
      error
      room {
        id
        users {
          id
          username
          avatar
          isMe
        }
        messages {
          id
          payload
          createdAt
          author {
            id
            username
            avatar
            isMe
          }
        }
      }
    }
  }
`;

export const ROOM_UPDATE_SUBSCRIPTION = gql`
  subscription OnMessageCreated($roomId: Int!) {
    roomUpdates(roomId: $roomId) {
      id
      payload
      author {
        id
        username
        avatar
        isMe
      }
      room {
        id
      }
      createdAt
    }
  }
`;

export const NEW_ROOM_SUBSCRIPTION = gql`
  subscription OnRoomCreated {
    onRoomCreated {
      id
      users {
        id
        username
        avatar
        isMe
      }
      lastMessage {
        id
        payload
        createdAt
      }
      unreadMessagesCount
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($roomId: Int, $payload: String!, $receiverId: Int) {
    sendMessage(roomId: $roomId, payload: $payload, receiverId: $receiverId) {
      ok
      error
      roomId
    }
  }
`;
