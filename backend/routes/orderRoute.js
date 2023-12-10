const express = require("express");
const { isAuthenticatedUser, authorizedRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getSellerOrders,
  updateSellerOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllOrders);
router
  .route("/seller/orders")
  .get(isAuthenticatedUser, authorizedRoles("seller"), getAllOrders);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteOrder);
router
  .route("/seller/order/:id")
  .put(isAuthenticatedUser, authorizedRoles("seller"), updateSellerOrder)
  .delete(isAuthenticatedUser, authorizedRoles("seller"), deleteOrder);

module.exports = router;
