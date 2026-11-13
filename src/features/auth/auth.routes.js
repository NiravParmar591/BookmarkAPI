const express = require("express");
const router = express.Router();
const { centralValidator } = require("../shared/middleware");
const { registerValidator, loginValidator } = require("./auth.validator");
const { registerUserService, loginUserService } = require("./auth.service");
const { authController } = require("./auth.controller");

router.post("/register", centralValidator(registerValidator, "body"), authController(registerUserService, "registration successfull", 201));
router.post("/login", centralValidator(loginValidator, "body"), authController(loginUserService, "login successfull", 200));

module.exports = router;