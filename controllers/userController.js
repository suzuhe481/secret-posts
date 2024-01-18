const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");

// Gets the details for a single user.
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Single User Details" });
});
