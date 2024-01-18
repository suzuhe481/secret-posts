var express = require("express");
var router = express.Router();

const user_controller = require("../controllers/userController");

// GET request for a single user.
router.get("/:id", user_controller.user_detail);

module.exports = router;
