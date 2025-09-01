import Logo from "../../components/Logo";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="w-full min-h-screen bg-black flex justify-center ">
      <div className="flex flex-col items-center w-full sm:w-1/3 min-h-screen bg-transparent px-10 sm:px-0 py-6 justify-between">
        <Logo />
        <div className="text-white  text-4xl sm:text-5xl  tracking-wide font-semibold ">
          Discover real sentences written by real learners.
        </div>
        <div className=" flex flex-col gap-5 sm:gap-6 w-full ">
          <Link
            to="/login"
            className="bg-blue-600 text-white text-base font-semibold rounded-2xl p-1 sm:p-2 inline-block text-center 
            sm:hover:bg-blue-800 transition"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="bg-white text-black text-base font-semibold rounded-2xl p-1  sm:p-2 inline-block text-center
          sm:hover:bg-gray-400 transition"
          >
            Create account
          </Link>
          <p className="text-white text-[10px] font-light sm:text-xs">
            By singing up, you agree to our <span className="text-blue-600">Terms</span>,
            <span className="text-blue-600"> Privacy Policy</span>, and{" "}
            <span className="text-blue-600">Cookie Use</span> .
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
