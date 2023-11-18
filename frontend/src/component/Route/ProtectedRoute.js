import { Navigate, Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
