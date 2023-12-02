import "./App.css";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store.js";
import { loadUser } from "./actions/userAction.js";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import AdminRoute from "./component/Route/AdminRoute.js";
import SellerRoute from "./component/Route/SellerRoute.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import Payment from "./component/Cart/Payment.js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import SellerProductList from "./component/Seller/SellerProductList.js";
import SellerDashboard from "./component/Seller/SellerDashboard.js";
import NewSellerProduct from "./component/Seller/NewSellerProduct.js";
import SellerUpdateProduct from "./component/Seller/SellerUpdateProduct.js";
import SellerOrderList from "./component/Seller/SellerOrderList.js";
import SellerProcessOrder from "./component/Seller/SellerProcessOrder.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setSetstripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setSetstripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route exact path="/cart" element={<Cart />} />

        {/*  Protected Routes */}
        <Route
          exact
          path="/account"
          element={
            <AdminRoute>
              <Profile />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/me/update"
          element={
            <AdminRoute>
              <UpdateProfile />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <AdminRoute>
              <UpdatePassword />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/shipping"
          element={
            <AdminRoute>
              <Shipping />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/order/confirm"
          element={
            <AdminRoute>
              <ConfirmOrder />
            </AdminRoute>
          }
        />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <AdminRoute>
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              </AdminRoute>
            }
          />
        )}
        <Route
          exact
          path="/success"
          element={
            <AdminRoute>
              <OrderSuccess />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/order/:id"
          element={
            <AdminRoute>
              <OrderDetails />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/orders"
          element={
            <AdminRoute>
              <MyOrders />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <AdminRoute isAdmin={true}>
              <Dashboard />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/products"
          element={
            <AdminRoute isAdmin={true}>
              <ProductList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <AdminRoute isAdmin={true}>
              <NewProduct user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <AdminRoute isAdmin={true}>
              <UpdateProduct user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <AdminRoute isAdmin={true}>
              <OrderList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <AdminRoute isAdmin={true}>
              <ProcessOrder user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <AdminRoute isAdmin={true}>
              <UsersList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <AdminRoute isAdmin={true}>
              <UpdateUser />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <AdminRoute isAdmin={true}>
              <ProductReviews user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/seller/dashboard"
          element={
            <SellerRoute isSeller={true}>
              <SellerDashboard user={user} />
            </SellerRoute>
          }
        />
        <Route
          exact
          path="/seller/products"
          element={
            <SellerRoute isSeller={true}>
              <SellerProductList user={user} />
            </SellerRoute>
          }
        />
        <Route
          exact
          path="/seller/product"
          element={
            <SellerRoute isSeller={true}>
              <NewSellerProduct user={user} />
            </SellerRoute>
          }
        />
        <Route
          exact
          path="/seller/product/:id"
          element={
            <SellerRoute isSeller={true}>
              <SellerUpdateProduct user={user} />
            </SellerRoute>
          }
        />
        <Route
          exact
          path="/seller/orders"
          element={
            <AdminRoute isSeller={true}>
              <SellerOrderList user={user} />
            </AdminRoute>
          }
        />
        <Route
          exact
          path="/seller/order/:id"
          element={
            <AdminRoute isSeller={true}>
              <SellerProcessOrder user={user} />
            </AdminRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
