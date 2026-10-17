
const { body, param } = require("express-validator");

const quantityValidator = (field) => [
    field
        .isInt()
        .withMessage("Quantity must be a whole number")
        .bail()
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error("Quantity cannot be negative");
            }

            return true;
        })
        .bail()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),
];

const addToCartValidator = [
    body("productId")
        .notEmpty()
        .withMessage("Product ID is required")
        .bail()
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("quantity")
        .optional()
        .custom((value) => {
            if (!Number.isInteger(Number(value))) {
                throw new Error("Quantity must be a whole number");
            }

            return true;
        })
        .bail()
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error("Quantity cannot be negative");
            }

            return true;
        })
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
        .custom((value) => {
            if (!Number.isInteger(Number(value))) {
                throw new Error("Quantity must be a whole number");
            }

            return true;
        })
        .bail()
        .custom((value) => {
            if (Number(value) < 0) {
                throw new Error("Quantity cannot be negative");
            }

            return true;
        })
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
