import useAuthToken from '../hooks/useAuthToken';
import { logoutUser } from '../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = useAuthToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    const action = await dispatch(logoutUser());
    if (action.type === logoutUser.fulfilled.type) {
      navigate(0);
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-300 p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">LOGO</div>

        {isAuthenticated ? (
          <div className="space-x-6">
            <a href="/" className="hover:text-blue-500 transition">
              home
            </a>
            <a href="/dictionary" className="hover:text-blue-500 transition">
              dictionary
            </a>
            <a href="/dashboard" className="hover:text-blue-500 transition">
              Dashboard
            </a>
            <button onClick={logOut} className="hover:text-blue-500 transition cursor-pointer">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-6">
            <a href="/login" className="hover:text-blue-500 transition">
              Login
            </a>
            <a href="/register" className="hover:text-blue-500 transition">
              Register
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
