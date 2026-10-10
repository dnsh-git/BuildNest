const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = Number(err.statusCode) || 500;

    if (statusCode >= 500) {
        console.error("Internal server error:", err.message);
    }

    res.status(statusCode).json({
        success: false,
        message:
            statusCode >= 500
                ? "Internal Server Error"
                : err.message || "Request failed",
    });
};

module.exports = errorHandler;