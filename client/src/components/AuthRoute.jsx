import React from 'react';
import useAuthToken from '../hooks/useAuthToken';
import LoadingSpinner from './LoadingSpinner';
import { Outlet, Navigate } from 'react-router-dom';

const AuthRoute = ({ type, redirectTo = '/' }) => {
  const isAuthenticated = useAuthToken();

  if (isAuthenticated === null) return <LoadingSpinner />;

  if (type === 'protected') {
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
  }
  return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet />;
};

export default AuthRoute;
