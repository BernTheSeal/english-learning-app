import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { createSession, clearSessionErrors } from "../../features/session/sessionSlice";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Error from "../../components/Error";

const LoginPage = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const canSubmit = email.length > 0 && password.length > 0;

  const { errors } = useSelector((store) => store.session);

  useEffect(() => {
    if (errors) {
      dispatch(clearSessionErrors());
    }
  }, []);

  useEffect(() => {
    if (errors && (email.length > 0 || password.length > 0)) {
      dispatch(clearSessionErrors());
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    const result = await dispatch(createSession({ email, password }));

    if (result.meta.requestStatus === "fulfilled") {
      window.location.href = "/home";
    }
  };

  return (
    <div className="w-full min-h-scree flex justify-center bg-black ">
      <div className="w-full min-h-screen  flex flex-col py-6 px-8 gap-20 sm:w-1/3 ">
        <Logo />
        <form
          className="w-full flex-1  flex flex-col justify-between"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-8">
            <p className="text-white   text-xl sm:text-3xl   font-medium tracking-wide">
              To log in, please enter your email and password.
            </p>

            <Input value={email} placeholder="Email" setter={setEmail} type="text" />

            <Input
              value={password}
              placeholder="Password"
              setter={setPassword}
              type="password"
            />

            <Error errors={errors} />
          </div>

          <div className="flex justify-between">
            <button
              className=" text-white text-xs sm:text-sm px-3 py-2 font-semibold border-2 rounded-2xl border-white
              sm:hover:bg-white hover:sm:text-black cursor-pointer transition"
              type="button"
            >
              Forgot password?
            </button>

            <button
              className={` text-xs sm:text-sm px-3 py-2 font-semibold  rounded-2xl transition 
                ${
                  canSubmit
                    ? "bg-white text-black cursor-pointer sm:hover:bg-blue-400 sm:hover:text-white "
                    : "bg-gray-500 text-gray-800"
                }`}
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
