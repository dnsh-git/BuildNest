
const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const upload = require("../middleware/upload.middleware");

const {
    createProductValidator,
    updateProductValidator,
    productIdValidator,
    productQueryValidator,
} = require("../validators/product.validator");

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

// =====================
// Public Routes
// =====================

// GET /api/products
router.get(
    "/",
    validate(productQueryValidator),
    getAllProducts
);

// GET /api/products/:id
router.get(
    "/:id",
    validate(productIdValidator),
    getProductById
);

// =====================
// Admin Routes
// =====================

// POST /api/products
router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    validate(createProductValidator),
    createProduct
);

// PUT /api/products/:id
router.put(
    "/:id",
    protect,
    admin,
    validate(productIdValidator),
    validate(updateProductValidator),
    updateProduct
);

// DELETE /api/products/:id
router.delete(
    "/:id",
    protect,
    admin,
    validate(productIdValidator),
    deleteProduct
);

module.exports = router;
