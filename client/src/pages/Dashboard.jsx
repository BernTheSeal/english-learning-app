import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/user/userSlice';
import { addWord, deleteWord } from '../redux/word/wordSlice';
import { useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, words, loading } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);

  const handleDeleteWord = (word) => {
    dispatch(deleteWord(word));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex h-screen bg-gray-100 p-8 flex-col">
      <div className="flex-1">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to the Dashboard</h1>
        </div>

        {/* User Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Username</h3>
            <p className="text-2xl font-bold mt-2">{user?.username}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium">Level</h3>
            <p className="text-2xl font-bold mt-2">{user?.level}</p>
          </div>
        </div>

        {/* Saved Words */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4">Saved Words</h3>
          <div className="grid grid-cols-2 gap-4">
            {words && words.length > 0 ? (
              words.map((word, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-lg font-medium">{word.word}</h4>
                    <p
                      className={`text-sm font-medium px-2 py-1 rounded-md inline-block ${
                        word.status === 'justLearned'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {word.status === 'justLearned' ? 'In Progress' : 'Mastered'}
                    </p>
                    <p className="text-sm text-gray-400">
                      {word.learnedAt
                        ? `Learned on: ${new Date(word.learnedAt).toLocaleDateString()}`
                        : 'Not learned yet'}
                    </p>
                  </div>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
                    onClick={() => handleDeleteWord(word.word)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No saved words yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
