const joi = require("joi");

exports.folderValidator = joi.object({
    name: joi.string().trim().min(1).max(100).required().messages({
        "string.empty": "Folder name is required",
        "string.min": "Folder name must be at least 1 character",
        "string.max": "Folder name must not exceed 100 characters",
        "any.required": "Folder name is required"
    })
});