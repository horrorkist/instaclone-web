import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { Link, useNavigate } from "react-router-dom";
import routes from "../router/routes";
import PageTitle from "../components/PageTitle";
import { gql, useMutation } from "@apollo/client";
import { CreateAccountMutation } from "../__generated__/graphql";
import { useState } from "react";

interface ISignUpForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

const CREATE_ACCOUNT = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { isValid },
    getValues,
  } = useForm<ISignUpForm>();

  const navigate = useNavigate();
  const [error, setError] = useState<string>("");

  const [createAccout, { loading }] = useMutation<CreateAccountMutation>(
    CREATE_ACCOUNT,
    {
      onCompleted: (data) => {
        const { ok, error } = data.createAccount!;
        if (ok) {
          const { username, password } = getValues();
          navigate(routes.login, {
            state: {
              username,
              password,
            },
          });
        } else {
          setError(error!);
        }
      },
    }
  );

  const onSubmitValid = (data: ISignUpForm) => {
    if (loading) {
      return;
    }
    createAccout({
      variables: {
        ...data,
      },
    });
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PageTitle title="Sign Up" />
      <div className="flex flex-col gap-4 w-96">
        <div className="border px-8 py-4 flex flex-col gap-4 w-full border-gray-300 items-center">
          <h1 className="text-3xl font-bold">Instagram</h1>
          <p className="text-gray-500 font-semibold flex text-center">
            Sign up to see photos and videos
            <br />
            from your friends.
          </p>
          <form
            onSubmit={handleSubmit(onSubmitValid)}
            className="w-full flex flex-col gap-2"
          >
            <Input
              control={control}
              name="firstName"
              placeholder="First Name"
              type="text"
              rules={{ required: true }}
              showError
            />
            <Input
              control={control}
              name="lastName"
              placeholder="Last Name"
              type="text"
              rules={{ required: true }}
              showError
            />
            <Input
              control={control}
              name="username"
              placeholder="Username"
              type="text"
              rules={{ required: true }}
              showError
            />
            <Input
              control={control}
              name="email"
              placeholder="Email"
              type="text"
              rules={{ required: true }}
              showError
            />
            <Input
              control={control}
              name="password"
              placeholder="Password"
              type="password"
              rules={{ required: true }}
              showError
            />
            <Button isValid={isValid} text="Sign Up" />
          </form>
          {error && <span className="text-center text-red-500">{error}</span>}
        </div>
        <div className="border p-4 flex justify-center text-sm border-gray-300 font-semibold">
          <span>Have an account?&nbsp;</span>
          <Link
            to={routes.login}
            className="text-blue-600 active:text-blue-400"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
