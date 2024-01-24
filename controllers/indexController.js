const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Displays the Secret Posts home page.
exports.index = asyncHandler(async (req, res, next) => {
  // Retrieves all the posts with the most recent first.
  const allPosts = await Post.find({}).sort({ post_date: -1 }).exec();

  res.render("index", {
    title: "Secret Posts",
    user: req.user,
    posts: allPosts,
  });
});
