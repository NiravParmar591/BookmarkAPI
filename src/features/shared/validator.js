const joi = require("joi");

exports.docIdValidator = (fieldName, required = true) => {
    let field = joi.string().hex().length(24);

    if (required) {
        field = field.required();
    }

    return joi.object({
        [fieldName]: field.messages({
            "string.empty": `${fieldName} is required`,
            "string.hex": `Invalid ${fieldName} format`,
            "string.length": `Invalid ${fieldName} format`,
            "any.required": `${fieldName} is required`
        })
    });
};