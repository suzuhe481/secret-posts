var express = require("express");
var router = express.Router();

const index_controller = require("../controllers/indexController");

// 3 ways to get to home page.
// GET Home page
router.get("/", index_controller.index);

// The following 2 GET methods redirect to the above route.
router.get("/home", function (req, res, next) {
  res.redirect("/");
});

router.get("/index", function (req, res, next) {
  res.redirect("/");
});

module.exports = router;
