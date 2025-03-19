import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Header />
      <div className="flex flex-grow items-center justify-center px-4 sm:px-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-300 w-full max-w-lg">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-6">
            Welcome to Our Site
          </h1>
          <p className="text-base sm:text-lg text-center text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque nihil odio
            officiis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
