const { dbConnection } = require("./db/db");
const express = require("express");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./features/shared/errorHandler");

const app = express();

const authRoutes = require("./features/auth/auth.routes");
const folderRoutes = require('./features/folder/folder.routes');
const bookmarkRoutes = require('./features/bookmark/bookmark.routes');

(async () => dbConnection())();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/folder", folderRoutes);
app.use("/bookmark", bookmarkRoutes);

app.use(errorHandler);

module.exports = app;