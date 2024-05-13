const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Gets the details for a single post.
exports.post_detail = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("user").exec();

  const isViewPostPage = true;

  res.render("post/detail", {
    title: "Post Detail",
    post: post,
    isViewPostPage: isViewPostPage,
  });
});

// Handles the creation of a new post.
exports.post_create_post = [
  // Validate form data
  body("post", "Post must not be empty").trim().escape().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors.
    const errors = validationResult(req);

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

// Handles a post delete on GET.
exports.post_delete_get = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate("user").exec();

  const isDeletePage = true;

  res.render("post/delete", {
    title: "Delete Post",
    post: post,
    isDeletePage: isDeletePage,
  });
});

// Handles a post delete on POST.
exports.post_delete_post = asyncHandler(async (req, res, next) => {
  await Post.findByIdAndDelete(req.params.id).exec();

  res.redirect("/");
});
