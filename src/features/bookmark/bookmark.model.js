const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    },
    folder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);