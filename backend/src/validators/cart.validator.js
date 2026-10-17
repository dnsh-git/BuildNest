
const { body, param } = require("express-validator");

const addToCartValidator = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("quantity")
        .optional()
        .isInt()
        .withMessage("Quantity must be a whole number")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
];

const updateCartValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .bail()
        .isInt()
        .withMessage("Quantity must be a whole number")
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
];

const removeCartItemValidator = [
    param("productId")
        .isMongoId()
        .withMessage("Invalid Product ID"),
];

module.exports = {
    addToCartValidator,
    updateCartValidator,
    removeCartItemValidator,
};
