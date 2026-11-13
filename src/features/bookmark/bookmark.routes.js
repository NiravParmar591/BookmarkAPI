const express = require("express");
const router = express.Router();
const { authenticate } = require("../auth/auth.middleware");
const { centralValidator } = require("../shared/middleware");
const { centralController } = require("../shared/controller");
const { createBookmarkValidator, updateBookmarkValidator } = require("./bookmark.validator");
const { createBookmarkService, getBookmarksServic, updateBookmarService, deleteBookmarService } = require("./bookmark.service");
const { docIdValidator } = require("../shared/validator");

router.use(authenticate);

router.post("/", centralValidator(createBookmarkValidator, "body"), centralController(createBookmarkService, 201));
router.get("/", centralValidator(docIdValidator("folderId", false), "query"), centralController(getBookmarksServic));
router.patch("/:id", centralValidator(docIdValidator("id"), "params"), centralValidator(updateBookmarkValidator, "body"), centralController(updateBookmarService));
router.delete("/:id", centralValidator(docIdValidator("id"), "params"), centralController(deleteBookmarService));

module.exports = router;