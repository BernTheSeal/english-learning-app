import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((store) => store.auth);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = await dispatch(loginUser(formData));
    if (action.type === loginUser.fulfilled.type) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-400 focus:border-blue-500 outline-none transition"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-400 focus:border-blue-500 outline-none transition"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-4 rounded-md font-semibold transition shadow-md hover:shadow-lg text-white ${
              loading ? 'bg-blue-300' : ' bg-blue-500  hover:bg-blue-600'
            } `}
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600 text-sm">
          Don't have an account?
          <span
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline cursor-pointer ml-1"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
