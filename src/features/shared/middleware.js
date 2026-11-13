exports.centralValidator = (validator, source) => async (req, res, next) => {
    let data;
    if (source === "body") data = req.body || {};
    else if (source === "params") data = req.params || {};
    else if (source === "query") data = req.query || {};

    const { value, error } = await validator.validate(data);
    if (error) return next(error);

    req.valid = { ...req.valid, ...value };
    next();
};