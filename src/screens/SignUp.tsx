import { useForm } from "react-hook-form";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import { Link } from "react-router-dom";
import routes from "../router/routes";

interface ISignUpForm {
  fullName: string;
  username: string;
  password: string;
}

function SignUp() {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ISignUpForm>();
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 w-96">
        <div className="border px-8 py-4 flex flex-col gap-4 w-full border-gray-300 items-center">
          <h1 className="text-3xl font-bold">Instagram</h1>
          <p className="text-gray-500 font-semibold flex text-center">
            Sign up to see photos and videos
            <br />
            from your friends.
          </p>
          <form
            onSubmit={handleSubmit((data) => console.log(data))}
            className="w-full flex flex-col gap-2"
          >
            <Input
              control={control}
              name="fullName"
              placeholder="Full Name"
              type="text"
              rules={{ required: true }}
            />
            <Input
              control={control}
              name="username"
              placeholder="Username"
              type="text"
              rules={{ required: true }}
            />
            <Input
              control={control}
              name="password"
              placeholder="Password"
              type="password"
              rules={{ required: true }}
            />
            <Button isValid={isValid} text="Sign Up" />
          </form>
        </div>
        <div className="border p-4 flex justify-center text-sm border-gray-300 font-semibold">
          <span>Have an account?&nbsp;</span>
          <Link to={routes.home} className="text-blue-600 active:text-blue-400">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
