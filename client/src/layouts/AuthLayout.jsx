import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = ({ type, redirectTo }) => {
  const isSession = useSelector((store) => store.session?.isSession);

  if (type === "protected") {
    return isSession ? <Outlet /> : <Navigate to={redirectTo} />;
  }

  if (type === "redirect") {
    return isSession ? <Navigate to={redirectTo} /> : <Outlet />;
  }
};

export default AuthLayout;
