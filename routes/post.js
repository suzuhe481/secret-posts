var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");

// Creating a post POST
router.post("/create", post_controller.post_create_post);

// Get a single post
router.get("/:id", post_controller.post_detail);

// GET/POST requests to delete a post.
router.get("/:id/delete", post_controller.post_delete_get);
router.post("/:id/delete", post_controller.post_delete_post);

module.exports = router;
