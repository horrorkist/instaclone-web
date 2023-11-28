import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  makeVar,
  ApolloLink,
  DefaultContext,
} from "@apollo/client";

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
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
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
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
