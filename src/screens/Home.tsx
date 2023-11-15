import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import Separator from "../components/Separator";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import routes from "../router/routes";

interface ILoginForm {
  username: string;
  password: string;
}

function Home() {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ILoginForm>();

  return (
    <div className="w-screen h-screen flex justify-center items-center">
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
            onSubmit={handleSubmit((data) => {
              console.log(data);
            })}
          >
            <Input
              control={control}
              name="username"
              rules={{ required: true }}
              placeholder="Username"
              type="password"
            />
            <Input
              control={control}
              name="password"
              rules={{ required: true }}
              placeholder="password"
              type="password"
            />
            <Button isValid={isValid} text={"Log In"} />
          </form>
          <Separator text="OR" />
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
          </div>
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

export default Home;
