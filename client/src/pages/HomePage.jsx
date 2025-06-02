import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const HomePage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4">
      {/* NAVBAR */}
      <div className="flex items-center justify-between py-4 backdrop-blur-sm">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-400 tracking-wide drop-shadow">
          YouVocabulary
        </div>

        {/* Right Side (Conditional Buttons) */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaUserCircle size={22} />
              <span className="text-sm">{user?.username}</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 transition font-semibold text-sm"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl bg-green-400 hover:bg-green-500 transition font-semibold text-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-col items-center justify-center text-center mt-32 space-y-6">
        <h1 className="text-5xl font-extrabold text-green-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Welcome
        </h1>
        <p className="max-w-xl text-gray-300 text-lg">
          Unlock your English vocabulary, save your favorite words, and grow every day.
          Join our community and take your language learning to the next level.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
