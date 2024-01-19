const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

// Gets the details for a single user.
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Single User Details" });
});

exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up" });
});