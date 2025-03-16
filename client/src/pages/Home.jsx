import Header from '../components/Header';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-300">
          <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">
            Welcome to Our Site
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae itaque nihil odio
            officiis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
