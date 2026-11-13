const jwt = require("jsonwebtoken");
const User = require("../user/user.model");
const { genError } = require("../shared/shared");

exports.authenticate = async (req, res, next) => {
    const authCookie = req.cookies["authCookie"];
    const token = jwt.verify(authCookie, process.env.JWT_KEY);

    const user = await User.findById(token.id);
    if (!user) return next(genError("User not found", 400));

    req.user = user;
    next();
};