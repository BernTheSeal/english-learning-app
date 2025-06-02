import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { checkAuth } from "../features/auth/authSlice";

const AppLayout = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkAuth());
  }, [location]);

  if (isAuthenticated === null) return <LoadingSpinner />;

  return <Outlet />;
};

export default AppLayout;
