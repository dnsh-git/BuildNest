
const { body, param, query } = require("express-validator");

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

// Validate product listing query parameters
const productQueryValidator = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be a positive integer"),

    query("limit")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Limit must be an integer between 1 and 100"),

    query("minPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be non-negative"),

    query("maxPrice")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be non-negative"),

    query("sort")
        .optional()
        .isIn([
            "price",
            "-price",
            "name",
            "-name",
            "createdAt",
            "-createdAt",
        ])
        .withMessage("Invalid sort option"),

    query().custom((value, { req }) => {
        const minPrice =
            req.query.minPrice === undefined
                ? undefined
                : Number(req.query.minPrice);

        const maxPrice =
            req.query.maxPrice === undefined
                ? undefined
                : Number(req.query.maxPrice);

        if (
            minPrice !== undefined &&
            maxPrice !== undefined &&
            minPrice > maxPrice
        ) {
            throw new Error(
                "Minimum price cannot exceed maximum price"
            );
        }

        return true;
    }),
];

module.exports = {
    createProductValidator,
    updateProductValidator,
    productIdValidator,
    productQueryValidator,
};
