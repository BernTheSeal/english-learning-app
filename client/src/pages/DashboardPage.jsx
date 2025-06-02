import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, sendVerificationCode } from "../features/auth/authSlice";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const DashboardPage = () => {
  const { user, message } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSendVerificationCode = () => {
    dispatch(sendVerificationCode());
  };

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  useEffect(() => {}, [user]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-12">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-green-400 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.4)]">
            Welcome, {user?.username || "User"}!
          </h1>
          <p className="text-gray-400 mt-2">{user?.email}</p>
        </header>

        <section className="flex items-center gap-4 bg-black/30 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-700">
          {user?.isVerified ? (
            <>
              <FaCheckCircle className="text-green-400 text-3xl" />
              <div>
                <p className="font-semibold text-green-300">Email Verified</p>
                <p className="text-sm text-gray-400">
                  Your email has been verified successfully.
                </p>
              </div>
            </>
          ) : (
            <>
              <FaExclamationCircle className="text-yellow-400 text-3xl" />
              <div>
                <p className="font-semibold text-yellow-300">Email Not Verified</p>
                <button
                  onClick={handleSendVerificationCode}
                  className="mt-1 text-sm text-yellow-400 underline hover:text-yellow-300 transition-all"
                >
                  Click here to verify your email
                </button>
              </div>
            </>
          )}
        </section>

        <div className="flex flex-wrap gap-4">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-xl shadow-md font-semibold">
            Change Password
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 transition-colors p-3 rounded-xl shadow-md font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
