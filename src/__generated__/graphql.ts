/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isMine: Scalars['Boolean']['output'];
  payload: Scalars['String']['output'];
  photo: Photo;
  updatedAt: Scalars['String']['output'];
};

export type CreateCommentResponse = {
  __typename?: 'CreateCommentResponse';
  comment?: Maybe<Comment>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetCommentsResponse = {
  __typename?: 'GetCommentsResponse';
  comments?: Maybe<Array<Maybe<Comment>>>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetFeedResponse = {
  __typename?: 'GetFeedResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type GetFollowersResult = {
  __typename?: 'GetFollowersResult';
  error?: Maybe<Scalars['String']['output']>;
  followers?: Maybe<Array<Maybe<User>>>;
  ok: Scalars['Boolean']['output'];
  totalPages?: Maybe<Scalars['Int']['output']>;
};

export type GetFollowingResult = {
  __typename?: 'GetFollowingResult';
  error?: Maybe<Scalars['String']['output']>;
  following?: Maybe<Array<Maybe<User>>>;
  lastId?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type GetHashtagResponse = {
  __typename?: 'GetHashtagResponse';
  error?: Maybe<Scalars['String']['output']>;
  hashtag?: Maybe<Hashtag>;
  ok: Scalars['Boolean']['output'];
};

export type GetPhotoResponse = {
  __typename?: 'GetPhotoResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  photo?: Maybe<Photo>;
};

export type GetPhotosResponse = {
  __typename?: 'GetPhotosResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
};

export type GetRoomResponse = {
  __typename?: 'GetRoomResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  room?: Maybe<Room>;
};

export type GetRoomsResponse = {
  __typename?: 'GetRoomsResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  rooms?: Maybe<Array<Maybe<Room>>>;
};

export type GetUserByUserNameResponse = {
  __typename?: 'GetUserByUserNameResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalPhotosCount: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};


export type HashtagPhotosArgs = {
  page: Scalars['Int']['input'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  photo: Photo;
  updatedAt: Scalars['String']['output'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  avatar?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  error?: Maybe<Scalars['String']['output']>;
  me?: Maybe<User>;
  ok: Scalars['Boolean']['output'];
};

export type Message = {
  __typename?: 'Message';
  author: User;
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  payload: Scalars['String']['output'];
  room: Room;
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: MutationResponse;
  createComment: CreateCommentResponse;
  deleteComment: MutationResponse;
  deletePhoto: MutationResponse;
  editComment: MutationResponse;
  editPhoto: MutationResponse;
  editProfile: MutationResponse;
  followUser: MutationResponse;
  login: LoginResult;
  sendMessage: MutationResponse;
  toggleLike: MutationResponse;
  unfollowUser: MutationResponse;
  uploadPhoto: UploadPhotoResponse;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  payload: Scalars['String']['input'];
  photoId: Scalars['Int']['input'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeletePhotoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationEditCommentArgs = {
  id: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
};


export type MutationEditPhotoArgs = {
  caption: Scalars['String']['input'];
  id: Scalars['Int']['input'];
};


export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationFollowUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationSendMessageArgs = {
  payload: Scalars['String']['input'];
  receiverId?: InputMaybe<Scalars['Int']['input']>;
  roomId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationToggleLikeArgs = {
  photoId: Scalars['Int']['input'];
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String']['input'];
};


export type MutationUploadPhotoArgs = {
  caption?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type Photo = {
  __typename?: 'Photo';
  author: User;
  caption?: Maybe<Scalars['String']['output']>;
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['String']['output'];
  hashtags?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int']['output'];
  isLiked: Scalars['Boolean']['output'];
  isMine: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  getFeed: GetFeedResponse;
  getFollowers: GetFollowersResult;
  getFollowing: GetFollowingResult;
  getHashtagByName: GetHashtagResponse;
  getPhoto: GetPhotoResponse;
  getPhotoComments: GetCommentsResponse;
  getPhotoLikes?: Maybe<Array<Maybe<User>>>;
  getPhotos: GetPhotosResponse;
  getRoom: GetRoomResponse;
  getRooms: GetRoomsResponse;
  getUploadUrl: Scalars['String']['output'];
  getUserByUserName: GetUserByUserNameResponse;
  me: MeResponse;
  searchUsers: SearchUsersResult;
};


export type QueryGetFeedArgs = {
  page: Scalars['Int']['input'];
};


export type QueryGetFollowersArgs = {
  page: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetFollowingArgs = {
  lastId?: InputMaybe<Scalars['Int']['input']>;
  username: Scalars['String']['input'];
};


export type QueryGetHashtagByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryGetPhotoArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetPhotoCommentsArgs = {
  id: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
};


export type QueryGetPhotoLikesArgs = {
  photoId: Scalars['Int']['input'];
};


export type QueryGetPhotosArgs = {
  page: Scalars['Int']['input'];
  username: Scalars['String']['input'];
};


export type QueryGetRoomArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserByUserNameArgs = {
  username: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  messages?: Maybe<Array<Maybe<Message>>>;
  unreadMessagesCount: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SearchUsersResult = {
  __typename?: 'SearchUsersResult';
  error?: Maybe<Scalars['String']['output']>;
  lastId?: Maybe<Scalars['Int']['output']>;
  ok: Scalars['Boolean']['output'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdates?: Maybe<Message>;
};


export type SubscriptionRoomUpdatesArgs = {
  roomId: Scalars['Int']['input'];
};

export type UploadPhotoResponse = {
  __typename?: 'UploadPhotoResponse';
  error?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
  photo?: Maybe<Photo>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int']['output'];
  isFollowing: Scalars['Boolean']['output'];
  isMe: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  photos?: Maybe<Array<Maybe<Photo>>>;
  totalFollowers: Scalars['Int']['output'];
  totalFollowing: Scalars['Int']['output'];
  totalPhotos: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type EditAvatarMutationVariables = Exact<{
  avatar?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditAvatarMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', ok: boolean, me?: { __typename?: 'User', username: string, email: string, firstName: string, lastName?: string | null, avatar?: string | null } | null } };

export type UploadUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type UploadUrlQuery = { __typename?: 'Query', getUploadUrl: string };

export type UploadPhotoMutationVariables = Exact<{
  url: Scalars['String']['input'];
  caption?: InputMaybe<Scalars['String']['input']>;
}>;


export type UploadPhotoMutation = { __typename?: 'Mutation', uploadPhoto: { __typename?: 'UploadPhotoResponse', ok: boolean, error?: string | null } };

export type CommentsQueryVariables = Exact<{
  photoId: Scalars['Int']['input'];
  skip: Scalars['Int']['input'];
}>;


export type CommentsQuery = { __typename?: 'Query', getPhotoComments: { __typename?: 'GetCommentsResponse', ok: boolean, error?: string | null, comments?: Array<{ __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, updatedAt: string, author: { __typename?: 'User', username: string, avatar?: string | null }, photo: { __typename?: 'Photo', id: number } } | null> | null } };

export type CreateCommentMutationVariables = Exact<{
  photoId: Scalars['Int']['input'];
  payload: Scalars['String']['input'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CreateCommentResponse', ok: boolean, error?: string | null, comment?: { __typename?: 'Comment', id: number, payload: string, isMine: boolean, createdAt: string, updatedAt: string, author: { __typename?: 'User', username: string, avatar?: string | null }, photo: { __typename?: 'Photo', id: number } } | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type ToggleLikeMutationVariables = Exact<{
  photoId: Scalars['Int']['input'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type FollowMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type FollowMutation = { __typename?: 'Mutation', followUser: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type UnfollowMutationVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollowUser: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type PhotosQueryVariables = Exact<{
  username: Scalars['String']['input'];
  page: Scalars['Int']['input'];
}>;


export type PhotosQuery = { __typename?: 'Query', getPhotos: { __typename?: 'GetPhotosResponse', ok: boolean, error?: string | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, caption?: string | null, likesCount: number, commentsCount: number, isLiked: boolean, isMine: boolean, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, username: string, avatar?: string | null, isMe: boolean, isFollowing: boolean } } | null> | null } };

export type UserQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', getUserByUserName: { __typename?: 'GetUserByUserNameResponse', ok: boolean, error?: string | null, user?: { __typename?: 'User', id: number, firstName: string, lastName?: string | null, username: string, bio?: string | null, avatar?: string | null, totalPhotos: number, totalFollowing: number, totalFollowers: number, isMe: boolean, isFollowing: boolean, photos?: Array<{ __typename?: 'Photo', id: number, url: string, likesCount: number, commentsCount: number, isLiked: boolean } | null> | null } | null } };

export type DeletePhotoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePhotoMutation = { __typename?: 'Mutation', deletePhoto: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type EditPhotoMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  caption: Scalars['String']['input'];
}>;


export type EditPhotoMutation = { __typename?: 'Mutation', editPhoto: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };

export type PhotoQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type PhotoQuery = { __typename?: 'Query', getPhoto: { __typename?: 'GetPhotoResponse', ok: boolean, error?: string | null, photo?: { __typename?: 'Photo', id: number, url: string, caption?: string | null, likesCount: number, commentsCount: number, isLiked: boolean, isMine: boolean, createdAt: string, updatedAt: string, author: { __typename?: 'User', id: number, username: string, avatar?: string | null, isMe: boolean, isFollowing: boolean } } | null } };

export type FollowersQueryVariables = Exact<{
  username: Scalars['String']['input'];
  page: Scalars['Int']['input'];
}>;


export type FollowersQuery = { __typename?: 'Query', getFollowers: { __typename?: 'GetFollowersResult', ok: boolean, error?: string | null, followers?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type FollowingQueryVariables = Exact<{
  username: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FollowingQuery = { __typename?: 'Query', getFollowing: { __typename?: 'GetFollowingResult', ok: boolean, error?: string | null, lastId?: number | null, following?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean } | null> | null } };

export type HomeFeedQueryVariables = Exact<{
  page: Scalars['Int']['input'];
}>;


export type HomeFeedQuery = { __typename?: 'Query', getFeed: { __typename?: 'GetFeedResponse', ok: boolean, error?: string | null, photos?: Array<{ __typename?: 'Photo', id: number, url: string, createdAt: string, updatedAt: string, caption?: string | null, likesCount: number, commentsCount: number, isLiked: boolean, author: { __typename?: 'User', id: number, username: string, avatar?: string | null, isMe: boolean, isFollowing: boolean } } | null> | null } };

export type SearchUsersQueryVariables = Exact<{
  keyword: Scalars['String']['input'];
  lastId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: { __typename?: 'SearchUsersResult', ok: boolean, error?: string | null, lastId?: number | null, users?: Array<{ __typename?: 'User', id: number, username: string, avatar?: string | null, isFollowing: boolean, isMe: boolean, totalFollowers: number } | null> | null } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResult', ok: boolean, error?: string | null, token?: string | null, username?: string | null, avatar?: string | null } };

export type CreateAccountMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'MutationResponse', ok: boolean, error?: string | null } };


export const EditAvatarDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editAvatar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editProfile"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"avatar"},"value":{"kind":"Variable","name":{"kind":"Name","value":"avatar"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditAvatarMutation, EditAvatarMutationVariables>;
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]}}]} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const UploadUrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"uploadUrl"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUploadUrl"}}]}}]} as unknown as DocumentNode<UploadUrlQuery, UploadUrlQueryVariables>;
export const UploadPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"uploadPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"caption"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uploadPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}},{"kind":"Argument","name":{"kind":"Name","value":"caption"},"value":{"kind":"Variable","name":{"kind":"Name","value":"caption"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UploadPhotoMutation, UploadPhotoMutationVariables>;
export const CommentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"comments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPhotoComments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}},{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CommentsQuery, CommentsQueryVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}},{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payload"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const ToggleLikeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"toggleLike"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"toggleLike"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"photoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const FollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"follow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<FollowMutation, FollowMutationVariables>;
export const UnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"unfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"unfollowUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<UnfollowMutation, UnfollowMutationVariables>;
export const PhotosDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"photos"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPhotos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PhotosQuery, PhotosQueryVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUserByUserName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalPhotos"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowers"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;
export const DeletePhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deletePhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deletePhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<DeletePhotoMutation, DeletePhotoMutationVariables>;
export const EditPhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"editPhoto"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"caption"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"editPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"caption"},"value":{"kind":"Variable","name":{"kind":"Name","value":"caption"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<EditPhotoMutation, EditPhotoMutationVariables>;
export const PhotoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"photo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPhoto"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}},{"kind":"Field","name":{"kind":"Name","value":"isMine"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<PhotoQuery, PhotoQueryVariables>;
export const FollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"followers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"followers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]}}]}}]} as unknown as DocumentNode<FollowersQuery, FollowersQueryVariables>;
export const FollowingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"following"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFollowing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"lastId"}},{"kind":"Field","name":{"kind":"Name","value":"following"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}}]}}]}}]}}]} as unknown as DocumentNode<FollowingQuery, FollowingQueryVariables>;
export const HomeFeedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"homeFeed"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFeed"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"photos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"caption"}},{"kind":"Field","name":{"kind":"Name","value":"likesCount"}},{"kind":"Field","name":{"kind":"Name","value":"commentsCount"}},{"kind":"Field","name":{"kind":"Name","value":"isLiked"}}]}}]}}]}}]} as unknown as DocumentNode<HomeFeedQuery, HomeFeedQueryVariables>;
export const SearchUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"keyword"},"value":{"kind":"Variable","name":{"kind":"Name","value":"keyword"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"lastId"}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}},{"kind":"Field","name":{"kind":"Name","value":"isFollowing"}},{"kind":"Field","name":{"kind":"Name","value":"isMe"}},{"kind":"Field","name":{"kind":"Name","value":"totalFollowers"}}]}}]}}]}}]} as unknown as DocumentNode<SearchUsersQuery, SearchUsersQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"avatar"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const CreateAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAccount"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"firstName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"firstName"}}},{"kind":"Argument","name":{"kind":"Name","value":"lastName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lastName"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"error"}}]}}]}}]} as unknown as DocumentNode<CreateAccountMutation, CreateAccountMutationVariables>;