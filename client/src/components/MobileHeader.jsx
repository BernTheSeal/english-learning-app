import { TbSettings } from "react-icons/tb";
import Logo from "./Logo";
import { CgProfile } from "react-icons/cg";

const MobileHeader = ({ setIsMobileNavbar }) => {
  const openMobileNavbar = () => {
    setIsMobileNavbar(true);
  };

  return (
    <div className="bg-black w-full h-[50px] flex items-center px-5 justify-between sm:hidden fixed top-0 z-100">
      <CgProfile className="text-white text-xl" onClick={() => openMobileNavbar()} />

      <Logo logoSize="text-sm" nameWeight="font-normal" />

      <TbSettings className="text-white text-xl" />
    </div>
  );
};

export default MobileHeader;
