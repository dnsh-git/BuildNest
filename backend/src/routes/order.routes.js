
const express = require("express");

const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
} = require("../controllers/order.controller");

const {
    placeOrderValidator,
    getOrderValidator,
    updateOrderStatusValidator,
} = require("../validators/order.validator");

// =====================
// User Routes
// =====================

// POST /api/orders
router.post(
    "/",
    protect,
    validate(placeOrderValidator),
    placeOrder
);

// GET /api/orders
router.get(
    "/",
    protect,
    getMyOrders
);

// GET /api/orders/:orderId
router.get(
    "/:orderId",
    protect,
    validate(getOrderValidator),
    getOrderById
);

// =====================
// Admin Route
// =====================

// PATCH /api/orders/:orderId/status
router.patch(
    "/:orderId/status",
    protect,
    admin,
    validate(updateOrderStatusValidator),
    updateOrderStatus
);

module.exports = router;
