var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

// GET/POST request to create a user.
// NOTE: This must come before the routes that (uses :id)
router.get("/create", user_controller.user_create_get);
router.post("/create", user_controller.user_create_post);

// GET/POST route-handler callbacks to create an admin user
router.get("/admin-create", user_controller.admin_user_create_get);
router.post("/admin-create", user_controller.admin_user_create_post);

// GET request for a single user.
router.get("/:id", user_controller.user_detail);

module.exports = router;
