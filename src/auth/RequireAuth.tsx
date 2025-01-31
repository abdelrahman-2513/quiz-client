import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface RequireAuthProps {
  Component: React.ComponentType;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ Component }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default RequireAuth;
