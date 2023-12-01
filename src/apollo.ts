import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
  ApolloLink,
  DefaultContext,
  split,
} from "@apollo/client";

import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const TOKEN = "token";

export const isLoggedInVar = makeVar<boolean>(
  Boolean(localStorage.getItem(TOKEN))
);

type UserInfo = {
  username: string;
  avatar?: string;
};

export const userInfoVar = makeVar<UserInfo>({
  username: "",
  avatar: "",
});

export const logUserIn = (
  token: string,
  username: string,
  avatar: string | undefined
) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  userInfoVar({ username, avatar });
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  userInfoVar({ username: "", avatar: "" });
  client.cache.reset();
};

const httpLink = createHttpLink({
  uri: process.env.VITE_HTTPS_LINK as string,
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext((context: DefaultContext) => {
    return {
      headers: {
        ...context.headers,
        token: localStorage.getItem(TOKEN),
      },
    };
  });
  return forward(operation);
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.VITE_WS_LINK as string,
    connectionParams: {
      token: localStorage.getItem(TOKEN),
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
