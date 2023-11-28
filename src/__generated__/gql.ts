/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation editAvatar($avatar: String) {\n    editProfile(avatar: $avatar) {\n      ok\n      error\n    }\n  }\n": types.EditAvatarDocument,
    "\n  query me {\n    me {\n      ok\n      me {\n        username\n        email\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query uploadUrl {\n    getUploadUrl\n  }\n": types.UploadUrlDocument,
    "\n  mutation uploadPhoto($url: String!, $caption: String) {\n    uploadPhoto(url: $url, caption: $caption) {\n      ok\n      error\n    }\n  }\n": types.UploadPhotoDocument,
    "\n  query comments($photoId: Int!, $skip: Int!) {\n    getPhotoComments(id: $photoId, skip: $skip) {\n      ok\n      error\n      comments {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CommentsDocument,
    "\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      comment {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateCommentDocument,
    "\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n": types.DeleteCommentDocument,
    "\n  mutation toggleLike($photoId: Int!) {\n    toggleLike(photoId: $photoId) {\n      ok\n      error\n    }\n  }\n": types.ToggleLikeDocument,
    "\n  mutation follow($username: String!) {\n    followUser(username: $username) {\n      ok\n      error\n    }\n  }\n": types.FollowDocument,
    "\n  mutation unfollow($username: String!) {\n    unfollowUser(username: $username) {\n      ok\n      error\n    }\n  }\n": types.UnfollowDocument,
    "\n  query photos($username: String!, $page: Int!) {\n    getPhotos(username: $username, page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.PhotosDocument,
    "\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n": types.UserDocument,
    "\n  mutation deletePhoto($id: Int!) {\n    deletePhoto(id: $id) {\n      ok\n      error\n    }\n  }\n": types.DeletePhotoDocument,
    "\n  mutation editPhoto($id: Int!, $caption: String!) {\n    editPhoto(id: $id, caption: $caption) {\n      ok\n      error\n    }\n  }\n": types.EditPhotoDocument,
    "\n  query photo($id: Int!) {\n    getPhoto(id: $id) {\n      ok\n      error\n      photo {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.PhotoDocument,
    "\n  query followers($username: String!, $page: Int!) {\n    getFollowers(username: $username, page: $page) {\n      ok\n      error\n      followers {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n": types.FollowersDocument,
    "\n  query following($username: String!, $lastId: Int) {\n    getFollowing(username: $username, lastId: $lastId) {\n      ok\n      error\n      lastId\n      following {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n": types.FollowingDocument,
    "\n  query homeFeed($page: Int!) {\n    getFeed(page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        createdAt\n        updatedAt\n        caption\n        likesCount\n        commentsCount\n        isLiked\n      }\n    }\n  }\n": types.HomeFeedDocument,
    "\n  query searchUsers($keyword: String!, $lastId: Int) {\n    searchUsers(keyword: $keyword, lastId: $lastId) {\n      ok\n      error\n      lastId\n      users {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n        totalFollowers\n      }\n    }\n  }\n": types.SearchUsersDocument,
    "\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n    username\n    avatar\n  }\n}\n": types.LoginDocument,
    "\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editAvatar($avatar: String) {\n    editProfile(avatar: $avatar) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editAvatar($avatar: String) {\n    editProfile(avatar: $avatar) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query me {\n    me {\n      ok\n      me {\n        username\n        email\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      ok\n      me {\n        username\n        email\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query uploadUrl {\n    getUploadUrl\n  }\n"): (typeof documents)["\n  query uploadUrl {\n    getUploadUrl\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation uploadPhoto($url: String!, $caption: String) {\n    uploadPhoto(url: $url, caption: $caption) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation uploadPhoto($url: String!, $caption: String) {\n    uploadPhoto(url: $url, caption: $caption) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query comments($photoId: Int!, $skip: Int!) {\n    getPhotoComments(id: $photoId, skip: $skip) {\n      ok\n      error\n      comments {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query comments($photoId: Int!, $skip: Int!) {\n    getPhotoComments(id: $photoId, skip: $skip) {\n      ok\n      error\n      comments {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      comment {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createComment($photoId: Int!, $payload: String!) {\n    createComment(photoId: $photoId, payload: $payload) {\n      ok\n      error\n      comment {\n        id\n        author {\n          username\n          avatar\n        }\n        photo {\n          id\n        }\n        payload\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deleteComment($id: Int!) {\n    deleteComment(id: $id) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation toggleLike($photoId: Int!) {\n    toggleLike(photoId: $photoId) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation toggleLike($photoId: Int!) {\n    toggleLike(photoId: $photoId) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation follow($username: String!) {\n    followUser(username: $username) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation follow($username: String!) {\n    followUser(username: $username) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation unfollow($username: String!) {\n    unfollowUser(username: $username) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation unfollow($username: String!) {\n    unfollowUser(username: $username) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query photos($username: String!, $page: Int!) {\n    getPhotos(username: $username, page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query photos($username: String!, $page: Int!) {\n    getPhotos(username: $username, page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n"): (typeof documents)["\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deletePhoto($id: Int!) {\n    deletePhoto(id: $id) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation deletePhoto($id: Int!) {\n    deletePhoto(id: $id) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation editPhoto($id: Int!, $caption: String!) {\n    editPhoto(id: $id, caption: $caption) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editPhoto($id: Int!, $caption: String!) {\n    editPhoto(id: $id, caption: $caption) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query photo($id: Int!) {\n    getPhoto(id: $id) {\n      ok\n      error\n      photo {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query photo($id: Int!) {\n    getPhoto(id: $id) {\n      ok\n      error\n      photo {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        caption\n        likesCount\n        commentsCount\n        isLiked\n        isMine\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query followers($username: String!, $page: Int!) {\n    getFollowers(username: $username, page: $page) {\n      ok\n      error\n      followers {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n"): (typeof documents)["\n  query followers($username: String!, $page: Int!) {\n    getFollowers(username: $username, page: $page) {\n      ok\n      error\n      followers {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query following($username: String!, $lastId: Int) {\n    getFollowing(username: $username, lastId: $lastId) {\n      ok\n      error\n      lastId\n      following {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n"): (typeof documents)["\n  query following($username: String!, $lastId: Int) {\n    getFollowing(username: $username, lastId: $lastId) {\n      ok\n      error\n      lastId\n      following {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query homeFeed($page: Int!) {\n    getFeed(page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        createdAt\n        updatedAt\n        caption\n        likesCount\n        commentsCount\n        isLiked\n      }\n    }\n  }\n"): (typeof documents)["\n  query homeFeed($page: Int!) {\n    getFeed(page: $page) {\n      ok\n      error\n      photos {\n        id\n        author {\n          id\n          username\n          avatar\n          isMe\n          isFollowing\n        }\n        url\n        createdAt\n        updatedAt\n        caption\n        likesCount\n        commentsCount\n        isLiked\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchUsers($keyword: String!, $lastId: Int) {\n    searchUsers(keyword: $keyword, lastId: $lastId) {\n      ok\n      error\n      lastId\n      users {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n        totalFollowers\n      }\n    }\n  }\n"): (typeof documents)["\n  query searchUsers($keyword: String!, $lastId: Int) {\n    searchUsers(keyword: $keyword, lastId: $lastId) {\n      ok\n      error\n      lastId\n      users {\n        id\n        username\n        avatar\n        isFollowing\n        isMe\n        totalFollowers\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n    username\n    avatar\n  }\n}\n"): (typeof documents)["\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n    username\n    avatar\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;