const User = require("../user/user.model");
const { genError, genToken } = require("../shared/shared");

exports.registerUserService = async ({ username, email, password }) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw genError("User already exists");
    }

    const user = new User({ username, email, password });
    await user.save();

    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.__v;

    const token = genToken({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_EX);

    return {
        token,
        userData: userObject
    };
};

exports.loginUserService = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.isPasswordMatches(password))) throw genError("Invalid email or password", 401);

    const token = genToken({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_EX);

    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    };
}