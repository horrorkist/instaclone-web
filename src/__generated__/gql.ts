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
    "\n  query uploadUrl {\n    getUploadUrl\n  }\n": types.UploadUrlDocument,
    "\n  mutation editAvatar($avatar: String) {\n    editProfile(avatar: $avatar) {\n      ok\n      error\n    }\n  }\n": types.EditAvatarDocument,
    "\n  query me {\n    me {\n      ok\n      me {\n        username\n        email\n        firstName\n        lastName\n        avatar\n      }\n    }\n  }\n": types.MeDocument,
    "\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n  }\n}\n": types.LoginDocument,
    "\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n": types.UserDocument,
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
export function graphql(source: "\n  query uploadUrl {\n    getUploadUrl\n  }\n"): (typeof documents)["\n  query uploadUrl {\n    getUploadUrl\n  }\n"];
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
export function graphql(source: "\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n  }\n}\n"): (typeof documents)["\n  mutation login ($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    ok\n    error\n    token\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n"): (typeof documents)["\n  query user($username: String!) {\n    getUserByUserName(username: $username) {\n      ok\n      error\n      user {\n        id\n        firstName\n        lastName\n        username\n        bio\n        avatar\n        photos {\n          id\n          url\n          likesCount\n          commentsCount\n          isLiked\n        }\n        totalPhotos\n        totalFollowing\n        totalFollowers\n        isMe\n        isFollowing\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount(\n    $firstName: String!\n    $lastName: String\n    $username: String!\n    $email: String!\n    $password: String!\n  ) {\n    createAccount(\n      firstName: $firstName\n      lastName: $lastName\n      username: $username\n      email: $email\n      password: $password\n    ) {\n      ok\n      error\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;