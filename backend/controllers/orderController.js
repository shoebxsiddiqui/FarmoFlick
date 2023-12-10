const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single User
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get Logged in User Orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get All Orders -- ADMIN
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach((orders) => {
    totalAmount += orders.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update Order Status -- ADMIN
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  if (req.body.status === "Delivered") {
    order.orderItems.forEach(async (o) => {
      if (o.status === "Processing") {
        return next(new ErrorHandler("Order not shipped Yet", 404));
      }
    });
    order.orderItems.forEach(async (o) => {
      o.status = "Delivered";
    });
    order.deliveredAt = Date.now();
  }

  order.orderStatus = "Delivered";
  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// Update Order Status -- ADMIN
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

// get All Orders -- Seller
exports.getSellerOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let ord = [];
  ord.forEach((order) => {
    const filteredItems = order.orderItems.filter((item) => {
      return item.user === req.params.id;
    });
    ord = ord.concat(filteredItems);
  });

  let totalAmount = 0;
  ord.forEach((order) => {
    totalAmount += order.price;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
    ord,
  });
});

// Update Order Status -- Seller
exports.updateSellerOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (order.orderStatus === "Shipped") {
    return next(new ErrorHandler("You have already delivered this order", 404));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      if (req.body.user === o.user) {
        await updateStock(o.product, o.quantity);
      }
    });
  }
  let lengthOfItems = 0;
  let LengthOfShipped = 0;
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      if (req.body.user === o.user) {
        o.status = req.body.status;
      }
      if (o.status === "Shipped") LengthOfShipped++;
      lengthOfItems++;
    });
  }

  if (lengthOfItems === LengthOfShipped) order.orderStatus = "Shipped";

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});
