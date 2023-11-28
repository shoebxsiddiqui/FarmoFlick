import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";
const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (loading === false && isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Fragment>{loading === false ? children : null}</Fragment>;
};

export default ProtectedRoute;
