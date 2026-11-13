const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/auth.middleware");
const { centralValidator } = require("../shared/middleware");
const { folderValidator } = require("./folder.validator");
const { centralController } = require("../shared/controller");
const { createFolderService, userFolderListService, updateFolderService, deleteFolderService } = require("./folder.service");
const { docIdValidator } = require("../shared/validator");

router.use(authenticate);

router.post("/", centralValidator(folderValidator, "body"), centralController(createFolderService, 201));
router.patch("/:id", centralValidator(docIdValidator("id"), "params"), centralValidator(folderValidator, "body"), centralController(updateFolderService));
router.delete("/:id", centralValidator(docIdValidator("id"), "params"), centralController(deleteFolderService));
router.get("/", centralController(userFolderListService));

module.exports = router;