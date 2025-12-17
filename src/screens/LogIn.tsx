import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Separator from "../components/Separator";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import routes from "../router/routes";
import PageTitle from "../components/PageTitle";
import CircularLoadingIndicator from "../components/CircularLoadingIndicator";
import {
  LoginMutation,
  LoginMutationVariables,
} from "../__generated__/graphql";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useState } from "react";

interface ILoginForm {
  username: string;
  password: string;
}

const LOGIN = gql(`
  mutation login ($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    error
    token
    username
    avatar
  }
}
`);

function LogIn() {
  const { state } = useLocation();
  const {
    handleSubmit,
    control,
    formState: { isValid, errors },
    getValues,
  } = useForm<ILoginForm>({
    defaultValues: {
      username: "daehan",
      password: "password123!",
    },
  });

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onCompleted = (data: LoginMutation) => {
    const { ok, error, token } = data.login!;

    if (!ok && error) {
      return setErrorMessage(error);
    }

    if (ok) {
      console.log(data.login.username, data.login.avatar);
      logUserIn(token!, data.login!.username!, data.login!.avatar!);
      navigate(routes.home, {
        replace: true,
      });
    }
  };

  const [login, { loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN, {
    onCompleted,
  });

  const onSubmit = async () => {
    if (loading) return;
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PageTitle title="Log In" />
      <div className="flex flex-col gap-4 w-96">
        <div className="border px-8 py-4 flex flex-col gap-4 w-full border-gray-300">
          <header className="my-4 flex justify-center items-center gap-4">
            <h1 className="text-3xl relative font-bold flex items-center">
              Instagram
              <FontAwesomeIcon
                className="absolute -left-10"
                icon={faInstagram}
              />
            </h1>
          </header>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              control={control}
              name="username"
              rules={{ required: true }}
              placeholder="Username"
              type="text"
            />
            <Input
              control={control}
              name="password"
              rules={{ required: true }}
              placeholder="password"
              type="password"
            />
            <Button
              isValid={isValid}
              text={loading ? <CircularLoadingIndicator size="sm" /> : "Log In"}
            />
          </form>

          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          {errors.username?.message && (
            <div className="text-red-500 text-center">
              {errors.username?.message}
            </div>
          )}
          {errors.password?.message && (
            <div className="text-red-500 text-center">
              {errors.password?.message}
            </div>
          )}
          {/* <Separator text="OR" />
          <div className="flex flex-col items-center gap-4 text-blue-900">
            <div className="flex justify-center items-center gap-2 font-semibold">
              <FontAwesomeIcon icon={faFacebook} />
              <span>Log in with Facebook</span>
            </div>
            <div className="">
              <Link to={"/"} className="text-xs cursor-pointer">
                Forgot password?
              </Link>
            </div>
          </div> */}
        </div>
        <div className="border p-4 flex justify-center text-sm border-gray-300 font-semibold">
          <span>Don't have an account?&nbsp;</span>
          <Link
            to={routes.signUp}
            className="text-blue-600 active:text-blue-400"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
