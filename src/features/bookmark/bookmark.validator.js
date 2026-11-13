const joi = require("joi");

exports.createBookmarkValidator = joi.object({
    title: joi.string().trim().min(1).max(200).required().messages({
        "string.empty": "Bookmark title is required",
        "string.min": "Bookmark title must be at least 1 character",
        "string.max": "Bookmark title must not exceed 200 characters",
        "any.required": "Bookmark title is required"
    }),
    url: joi.string().trim().required().messages({
        "string.empty": "URL is required",
        "string.uri": "Please enter a valid URL",
        "any.required": "URL is required"
    }),
    folderId: joi.string().hex().length(24).required().messages({
        "string.empty": "Folder ID is required",
        "string.hex": "Invalid folder ID",
        "string.length": "Invalid folder ID",
        "any.required": "Folder ID is required"
    })
});

exports.updateBookmarkValidator = joi.object({
    title: joi.string().trim().min(1).max(200).messages({
        "string.empty": "Title cannot be empty",
        "string.min": "Title must be at least 1 character",
        "string.max": "Title must not exceed 200 characters"
    }),
    url: joi.string().trim().messages({
        "string.empty": "URL cannot be empty",
        "string.uri": "Please enter a valid URL"
    })
}).or("title", "url").messages({
    "object.missing": "At least title or URL is required"
});