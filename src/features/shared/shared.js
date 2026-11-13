const jwt = require("jsonwebtoken");

exports.genToken = (data, expiresIn) => jwt.sign(data, process.env.JWT_KEY, { expiresIn });

exports.genError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};