const mongoose = require("mongoose");

exports.dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("database connected successfully");
    } catch (err) {
        console.log("database connection error");
        console.error(err);
    }
};