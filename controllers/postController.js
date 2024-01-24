const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Gets the details for a single post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Single Post Details" });
});
