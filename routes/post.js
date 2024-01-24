var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

// Get a single post
router.get("/:id", post_controller.post_detail);

// Creating a post POST
router.post("/create", post_controller.post_create_post);

module.exports = router;
