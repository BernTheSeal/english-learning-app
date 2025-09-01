import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MobileNavbar from "../pages/navbar/MobileNavbar";
import MobileHeader from "../components/MobileHeader";
import Navbar from "../pages/navbar/Navbar";

const MainLayout = () => {
  const [isMobileNavbar, setIsMobileNavbar] = useState(false);

  useEffect(() => {
    if (isMobileNavbar) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMobileNavbar]);

  return (
    <div
      className={`flex bg-black flex-col sm:flex-row sm:justify-center min-h-screen pt-[50px] sm:pt-0 `}
    >
      <MobileHeader setIsMobileNavbar={setIsMobileNavbar} />

      {isMobileNavbar && (
        <MobileNavbar
          isMobileNavbar={isMobileNavbar}
          setIsMobileNavbar={setIsMobileNavbar}
        />
      )}

      <main className=" sm:w-308 text-white sm:flex sm:justify-between ">
        <div className="hidden sm:flex sm:flex-2 sm:min-h-screen">
          <Navbar />
        </div>
        <div className="sm:flex-5  min-h-screen border-1 border-neutral-900">
          <Outlet />
        </div>
        <div className="hidden sm:flex sm:flex-3  sm:min-h-screen">right panel</div>
      </main>
    </div>
  );
};

export default MainLayout;
