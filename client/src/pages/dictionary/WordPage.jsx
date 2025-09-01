import { NavLink, Outlet } from "react-router-dom";

const WordPage = () => {
  return (
    <div className="w-full  ">
      <div className="w-full flex h-12 text-sm">
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-400" : "sm:hover:bg-neutral-900 text-gray-500"
            } flex-1 flex justify-center items-center border-b border-t border-neutral-900`
          }
          to=""
          end
        >
          Details
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${
              isActive ? "text-blue-400" : "sm:hover:bg-neutral-900 text-gray-500"
            } flex-1 flex justify-center items-center border-b border-t border-neutral-900  `
          }
          to="sentences"
        >
          Sentences
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default WordPage;
