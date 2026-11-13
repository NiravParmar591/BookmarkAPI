exports.authController = (service, message, code = 200) => async (req, res) => {
    const { valid } = req;
    const serviceData = await service(valid);

    res.cookie("authCookie", serviceData.token, {
        maxAge: process.env.COOKIE_MAX_AGE_IN_DAY * 24 * 7 * 60 * 60 * 1000,
        httpOnly: true
    });

    res.status(code).json({ success: true, message, ...serviceData });
};