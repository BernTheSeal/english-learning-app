import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = ({ type, redirectTo = "/" }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (type === "protected") {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  }

  if (type === "redirect") {
    return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
  }
};

export default AuthRoute;
