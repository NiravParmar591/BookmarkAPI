exports.centralController = (service, code = 200) => async (req, res) => {
    const serviceData = await service({ user: req.user, input: req.valid });
    res.status(code).json(serviceData);
};