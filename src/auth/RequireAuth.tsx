import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Layout from "../components/Layout";

interface RequireAuthProps {
  Component: React.ComponentType;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ Component }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Layout><Component /></Layout> : <Navigate to="/" />;
};

export default RequireAuth;
