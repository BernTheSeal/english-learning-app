import { useEffect, useState } from "react";
import { links } from "./links";
import { Link, NavLink } from "react-router-dom";
import { BsMoonStars } from "react-icons/bs";

const MobileNavbar = ({ setIsMobileNavbar, isMobileNavbar }) => {
  const [startAnimation, setStartAnimation] = useState(false);

  const closeMobileNavbar = (index) => {
    setStartAnimation(false);
    setTimeout(() => {
      setIsMobileNavbar(false);
    }, 200);
  };

  useEffect(() => {
    if (isMobileNavbar) {
      setTimeout(() => {
        setStartAnimation(true);
      }, 0);
    }
  }, [isMobileNavbar]);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-150 text-white sm:hidden">
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black transition-opacity duration-200 ${
          startAnimation ? "opacity-80" : "opacity-0"
        }`}
        onClick={() => closeMobileNavbar()}
      ></div>

      <div
        className={` flex flex-col absolute top-0 left-0 h-full w-4/5 bg-black shadow-lg px-6  transition-transform duration-200 ${
          startAnimation ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className=" h-6/20 flex items-center  py-8 border-b border-neutral-900">
          <div className="flex flex-col space-y-3">
            <div className="h-10 w-10 bg-amber-600 rounded-full"></div>

            <div>
              <div className="font-semibold tracking-wide text-sm">Berkant</div>
              <div className="text-gray-500 text-xs">@berkant1122</div>
            </div>
            <div className="text-xs">
              2.4K <span className="text-gray-500">Known words</span>
            </div>
          </div>
        </div>
        <div></div>
        <div className=" h-12/20 overflow-y-auto ">
          <div className="flex flex-col gap-5 py-8 text-white text-lg">
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={index}
                  to={link.path}
                  onClick={() => closeMobileNavbar(index)}
                  className={({ isActive }) =>
                    `flex items-center gap-5    ${isActive ? " text-blue-400 ]" : ""}`
                  }
                >
                  <Icon />
                  <span className="font-medium">{link.label}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
        <div className=" h-2/20 text-xl flex items-center">
          <BsMoonStars />
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
