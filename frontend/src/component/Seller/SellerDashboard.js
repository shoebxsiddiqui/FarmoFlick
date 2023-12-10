import React, { useEffect } from "react";
import Sidebar from "../Admin/Sidebar.js";
import "../Admin/dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { registerables, Chart } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getSellerProduct } from "../../actions/productAction";
import { getAllOrders } from "../../actions/orderAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => {
    return state.allOrders;
  });

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getSellerProduct(user._id));
    dispatch(getAllOrders(user._id));
  }, [dispatch, user._id]);

  let totalAmount = 0;
  let totalLength = 0;
  orders &&
    orders.forEach((order) => {
      totalLength = totalLength + 1;
      if (order.orderItems) {
        order.orderItems.forEach((item) => {
          if (item.user === user._id) {
            totalAmount += item.price * item.quantity;
          }
        });
      }
    });

  Chart.register(...registerables);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["tomato"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A684", "#680084"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar user={user} />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/seller/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/seller/orders">
              <p>Orders</p>
              <p>{totalLength}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
