const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Displays the Secret Posts home page.
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Secret Posts" });
});
