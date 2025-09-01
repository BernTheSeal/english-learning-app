import { useDispatch, useSelector } from "react-redux";
import { useLocation, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { checkSession } from "../features/session/sessionSlice";

const SessionLayout = () => {
  const isSession = useSelector((store) => store.session.isSession);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkSession());
  }, [location]);

  if (isSession !== null) return <Outlet />;
};

export default SessionLayout;
