const dotenv = require("dotenv");
dotenv.config();

const app = require("./src/app");

app.listen(process.env.APP_PORT, () => {
    console.log(`your site listen on http://localhost:${process.env.APP_PORT}`);
});