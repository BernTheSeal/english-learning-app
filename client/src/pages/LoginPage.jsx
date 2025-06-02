import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const LoginPage = () => {
  const dispatch = useDispatch();

  const { loading, errors, message } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (message) {
      toast.error(message);
    }
  }, [message]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="w-full max-w-md backdrop-blur-md bg-black/30 border border-gray-700 rounded-3xl p-8 shadow-2xl text-white">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-green-400 drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600/40"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-600 bg-gray-800 p-3 text-white placeholder-gray-400 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-600/40"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="h-4 w-4 rounded border-gray-500 bg-gray-700 text-green-500 focus:ring-green-500"
              />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-green-400 hover:underline">
              Forgot password?
            </Link>
          </div>

          {errors?.length > 0 && (
            <div className="rounded-md bg-red-500/10 border border-red-500 p-3 text-sm text-red-400">
              {errors.map((err, index) => (
                <div key={index}>{err.message}</div>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-500 hover:bg-green-600 transition-colors p-3 text-white font-semibold disabled:bg-green-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?
          <Link to="/register" className="text-green-400 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
