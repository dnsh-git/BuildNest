
const { body, param } = require("express-validator");

// Validate product creation
const createProductValidator = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required"),

    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Brand is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("price")
        .notEmpty()
        .withMessage("Price is required")
        .bail()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("isFeatured")
        .optional()
        .isBoolean()
        .withMessage("isFeatured must be true or false"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be true or false"),
];

// Validate partial product updates
const updateProductValidator = [
    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Product name cannot be empty"),

    body("description")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Description cannot be empty"),

    body("brand")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Brand cannot be empty"),

    body("category")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Category cannot be empty"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Price must be a non-negative number"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be a non-negative integer"),

    body("isFeatured")
        .optional()
        .isBoolean()
        .withMessage("isFeatured must be true or false"),

    body("isActive")
        .optional()
        .isBoolean()
        .withMessage("isActive must be true or false"),
];

// Validate MongoDB product IDs
const productIdValidator = [
    param("id")
        .isMongoId()
        .withMessage("Invalid product ID"),
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdValidator,
};
