
const { body, param } = require("express-validator");

const ORDER_STATUSES = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
];

// Orders are generated from the authenticated user's cart.
// Reject client-supplied order details that the server calculates itself.
const placeOrderValidator = [
    body("user")
        .not()
        .exists()
        .withMessage("User ID is determined by authentication"),

    body("items")
        .not()
        .exists()
        .withMessage("Order items are generated from your cart"),

    body("totalAmount")
        .not()
        .exists()
        .withMessage("Order total is calculated by the server"),

    body("status")
        .not()
        .exists()
        .withMessage("Order status is managed by the server"),
];

// Validate order ID
const getOrderValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid Order ID"),
];

// Validate order ID and requested status
const updateOrderStatusValidator = [
    param("orderId")
        .isMongoId()
        .withMessage("Invalid Order ID"),

    body("status")
        .notEmpty()
        .withMessage("Status is required")
        .bail()
        .isIn(ORDER_STATUSES)
        .withMessage("Invalid order status"),
];

module.exports = {
    placeOrderValidator,
    getOrderValidator,
    updateOrderStatusValidator,
};
