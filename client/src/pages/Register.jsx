import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((store) => store.auth);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    level: 'A1',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const action = await dispatch(registerUser(formData));
    if (action.type === registerUser.fulfilled.type) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
      <div>{error && error.length > 0 && error.map((err) => <div>{err}</div>)}</div>
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          <div className="relative">
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full p-4 rounded-md bg-gray-100 text-gray-900 border border-gray-400 focus:border-blue-500 outline-none transition"
            >
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="C1">C1</option>
              <option value="C2">C2</option>
            </select>
          </div>
          <button
            type="submit"
            className={`w-full p-4 rounded-md font-semibold transition shadow-md hover:shadow-lg text-white ${
              loading ? 'bg-blue-300' : ' bg-blue-500  hover:bg-blue-600'
            } `}
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600 text-sm">
          Already have an account?
          <span
            onClick={() => navigate('/login')}
            className="text-blue-500 hover:underline cursor-pointer ml-1"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
