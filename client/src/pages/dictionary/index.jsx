import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";

const DictionaryPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    navigate(`/dictionary/${searchValue.trim()}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className=" w-full p-4 flex">
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="bg= w-full h-8 px-4 text-white placeholder-gray-700 bg-black 
          rounded-none border-none focus:outline-none focus:ring-0 focus:border-transparent focus:shadow-none
          placeholder:text-sm placeholder:font-medium"
          placeholder="Search a word from dictionary"
        />
        <button className="cursor-pointer text-xl" type="submit">
          <IoIosSearch />
        </button>
      </form>
      <Outlet />
    </div>
  );
};

export default DictionaryPage;
