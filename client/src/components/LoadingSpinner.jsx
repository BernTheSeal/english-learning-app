const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-2xl font-bold text-green-400 mb-4 animate-pulse">YouVocabulary</div>
      <div className="text-sm text-gray-300 animate-pulse">Loading...</div>
    </div>
  );
};

export default LoadingSpinner;
