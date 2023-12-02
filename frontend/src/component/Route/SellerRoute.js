import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Fragment } from "react";

const SellerRoute = ({ children, isSeller }) => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  if (!loading && isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (loading === false && isSeller && user.role !== "seller") {
    return <Navigate to="/login" />;
  }
  return <Fragment>{loading === false ? children : null}</Fragment>;
};

export default SellerRoute;
