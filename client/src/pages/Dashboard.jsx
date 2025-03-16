import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/user/userSlice';
import { logoutUser } from '../redux/auth/authSlice';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-100 p-8 flex-col">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Username</h3>
            <p className="text-2xl font-bold mt-2">{user?.username}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">level</h3>
            <p className="text-2xl font-bold mt-2">{user?.level}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
