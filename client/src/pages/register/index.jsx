import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../features/user-account/userAccountSlice";
import { clearAccountErrors } from "../../features/user-account/userAccountSlice";

import Logo from "../../components/Logo";
import Input from "../../components/Input";
import Error from "../../components/Error";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { errors, message } = useSelector((store) => store.userAccount);

  useEffect(() => {
    if (errors) {
      dispatch(clearAccountErrors());
    }
  }, []);

  useEffect(() => {
    if (errors && (email.length > 0 || password.length > 0 || username.length > 0)) {
      dispatch(clearAccountErrors());
    }
  }, [email, password, username]);

  const canSubmit = email.length > 0 && password.length > 0 && username.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
      return;
    }

    const result = await dispatch(createUser({ email, password, username }));

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
              Create an account.
            </p>
            <Input value={email} placeholder="Email" setter={setEmail} type="text" />

            <Input
              value={username}
              placeholder="Username"
              setter={setUsername}
              type="text"
            />

            <Input
              value={password}
              placeholder="Password"
              setter={setPassword}
              type="password"
            />

            <Error errors={errors} />
          </div>

          <div className="flex justify-end">
            <button
              className={` text-xs sm:text-sm px-3 py-2 font-semibold  rounded-2xl transition 
                ${
                  canSubmit
                    ? "bg-white text-black cursor-pointer sm:hover:bg-blue-400 sm:hover:text-white "
                    : "bg-gray-500 text-gray-800"
                }`}
              type="submit"
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
