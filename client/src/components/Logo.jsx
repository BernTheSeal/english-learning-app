import { FaFeatherAlt } from "react-icons/fa";

const Logo = ({ logoSize = "text-2xl", nameWeight = "font-semibold" }) => {
  return (
    <div className="text-white flex flex-col items-center gap-1">
      <FaFeatherAlt className={`${logoSize}`} />
      <h1 className={`${nameWeight} tracking-wider font-bold text-xs`}>Lingrow</h1>
    </div>
  );
};

export default Logo;
