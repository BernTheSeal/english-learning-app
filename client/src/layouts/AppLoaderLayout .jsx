import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { loadAppData } from "../features/app/appSlice";
import Logo from "../components/Logo";

const AppLoaderLayout = () => {
  const dispatch = useDispatch();
  const { initialHasChecked } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(loadAppData());
  }, []);

  if (!initialHasChecked) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white text-xl">
        <Logo logoSize="text-6xl" />
      </div>
    );
  }

  return <Outlet />;
};

export default AppLoaderLayout;
