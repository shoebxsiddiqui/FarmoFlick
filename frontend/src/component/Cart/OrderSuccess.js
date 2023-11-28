import React from "react";
import "./OrderSuccess.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;
