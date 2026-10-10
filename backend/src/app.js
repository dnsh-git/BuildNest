const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const errorHandler = require("./middleware/error.middleware");
const { apiLimiter, authLimiter } = require("./middleware/rateLimit.middleware");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const wishlistRoutes = require("./routes/wishlist.routes");
const orderRoutes = require("./routes/order.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

app.disable("x-powered-by");

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigin =
    process.env.CLIENT_URL || "http://localhost:5173";

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || origin === allowedOrigin) {
                return callback(null, true);
            }

            return callback(null, false);
        },
        credentials: true,
    })
);

// Request parsing with payload limits
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// HTTP request logging
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BuildNest API is running",
    });
});

// API rate limiting
app.use("/api", apiLimiter);
app.use("/api/auth", authLimiter);

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", reviewRoutes);

// Global error handler
app.use(errorHandler);

module.exports = app;