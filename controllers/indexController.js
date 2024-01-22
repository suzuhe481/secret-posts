const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Displays the Secret Posts home page.
exports.index = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Secret Posts" });
});

// Handles the creation of a new post.
exports.index_post = [
  // Validate form data
  body("post", "Post must not be empty").trim().escape().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors.
    const errors = validationResult(req);

    // Get the current user.
    const currUser = User.findOne({ id: req.user._id });

    // Get date and time at time of posting.
    const date = new Date().toISOString();

    // Create post object with given form data.
    const post = new Post({
      post: req.body.post,
      post_date: date,
      user: req.user,
    });

    // There are errors.
    // Render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      res.render("/", {
        title: "Secret Posts",
        errors: errors.array(),
      });
      return;
    }
    // Save post and add post to current user's posts.
    else {
      await post.save();

      const filter = { _id: req.user._id };
      const update = { $push: { posts: post } };
      await User.findOneAndUpdate(filter, update, { new: true });

      res.redirect("/");
    }
  }),
];
