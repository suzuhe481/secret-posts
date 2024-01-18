var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

// Get a single post
router.get("/:id", post_controller.post_detail);

module.exports = router;
