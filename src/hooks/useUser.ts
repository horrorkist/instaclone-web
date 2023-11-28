import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut, userInfoVar } from "./../apollo";
import { MeQuery } from "../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { useEffect } from "react";

const ME_QUERY = gql`
  query me {
    me {
      ok
      me {
        username
        email
        firstName
        lastName
        avatar
      }
    }
  }
`;

function useUser() {
  const navigate = useNavigate();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading } = useQuery<MeQuery>(ME_QUERY, {
    skip: !hasToken,
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    if (!loading) {
      if (!data || !data.me || !data.me.ok) {
        logUserOut();
        navigate(routes.login, {
          replace: true,
        });
      }

      if (data?.me.ok) {
        userInfoVar({
          username: data.me.me?.username || "",
          avatar: data.me.me?.avatar || "",
        });
      }
    }
  }, [data, navigate, loading]);

  return { data, loading };
}

export default useUser;
