import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut, userInfoVar } from "./../apollo";
import { MeQuery } from "../__generated__/graphql";
import { useNavigate } from "react-router-dom";
import routes from "../router/routes";
import { useEffect } from "react";
import { ME_QUERY } from "../libs/queries";

function useUser() {
  const navigate = useNavigate();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, loading, refetch } = useQuery<MeQuery>(ME_QUERY, {
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

  return { data, loading, refetch };
}

export default useUser;
