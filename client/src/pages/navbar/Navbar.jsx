import { Link, NavLink } from "react-router-dom";
import { links } from "./links";
import Logo from "../../components/Logo";

const Navbar = () => {
  return (
    <div className="relativ">
      <div className="fixed h-screen flex flex-col justify-between py-4 ">
        <div className="flex flex-col items-start gap-1.5">
          <Logo />
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-5 p-3  text-xl font-medium rounded-3xl transition  ${
                    isActive ? " text-blue-400 ]" : "hover:bg-neutral-900"
                  }`
                }
              >
                <Icon className="text-2xl" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
