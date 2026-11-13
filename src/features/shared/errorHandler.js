const jwt = require("jsonwebtoken");
const joi = require("joi");

exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err.isJoi) {
        return res.status(400).json({
            success: false,
            message: err.details[0].message
        })
    }

    if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
            success: false,
            message: "Token has expired."
        });
    }

    if (err instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }

    if (err.name === "TokenNotFoundError") {
        return res.status(401).json({
            success: false,
            message: "Authentication token is required."
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};