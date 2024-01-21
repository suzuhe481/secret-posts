const Post = require("../models/post");
const User = require("../models/user");

const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Gets the details for a single user.
exports.user_detail = asyncHandler(async (req, res, next) => {
  res.render("index", { title: "Single User Details" });
});

// Displays the User create form on GET.
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up" });
});

// Handles User create on POST.
exports.user_create_post = [
  // Validate form data.
  body("first_name", "Must must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("last_name", "Name must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("username", "Username must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("email", "Email is required")
    .trim()
    .escape()
    .isEmail()
    .isLength({ min: 1 }),
  body("password", "Password must be more than 3 characters")
    .trim()
    .escape()
    .isLength({ min: 3 }),
  body("status", "Status must be selected").trim().escape(),
  body("member_plus_password", "Password must not be empty").trim().escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors.
    const errors = validationResult(req);

    // Array to store custom error messages.
    const customErrors = [];

    // Creating user object WITHOUT password
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      status: req.body.status,
    });

    // There are errors.
    // Render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        title: "Sign Up",
        user: user,
        errors: errors.array(),
      });
      return;
    }
    // Catches if user tries to be Member+ with incorrect password
    else if (
      req.body.status === "Member+" &&
      req.body.member_plus_password !== process.env.MEMBER_PLUS_PASS
    ) {
      var incorrectMemberPlusError = "Incorrect Member+ Password";
      customErrors.push(incorrectMemberPlusError);

      // Render form again with custom error message.
      res.render("sign-up-form", {
        title: "Sign Up",
        user: user,
        customErrors: customErrors,
      });
    }

    // Checks if username already exists.
    const usernameExists = await User.findOne({
      username: req.body.username,
    }).exec();

    // Username already exists.
    if (usernameExists) {
      var usernameExistsError = "Username already exists";
      customErrors.push(usernameExistsError);

      // Render form again with custom error message.
      res.render("sign-up-form", {
        title: "Sign Up",
        user: user,
        customErrors: customErrors,
      });
      return;
    }

    // Creating hashed password for the valid user.
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          // Error, do something
        } else {
          // Adds hashed password to user object.
          user.password = hashedPassword;

          // Save new user and redirect to home page.
          await user.save();
          res.redirect("/");
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];

// Displays the User ADMIN create form on GET.
exports.admin_user_create_get = asyncHandler(async (req, res, next) => {
  res.render("admin-sign-up-form", { title: "Admin Sign Up" });
});

// Handles User ADMIN create on POST.
exports.admin_user_create_post = [
  // Validate form data.
  body("first_name", "Must must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("last_name", "Name must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("username", "Username must not be empty")
    .trim()
    .escape()
    .isLength({ min: 1 }),
  body("email", "Email is required")
    .trim()
    .escape()
    .isEmail()
    .isLength({ min: 1 }),
  body("password", "Password must be more than 3 characters")
    .trim()
    .escape()
    .isLength({ min: 3 }),
  body("status", "Status must be selected").trim().escape(),
  body("admin_password", "Password must not be empty").trim().escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors.
    const errors = validationResult(req);

    // Array to store custom error messages.
    const customErrors = [];

    // Creating user object WITHOUT password
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      email: req.body.email,
      status: req.body.status,
    });

    // There are errors.
    // Render form again with sanitized values and error messages.
    if (!errors.isEmpty()) {
      res.render("admin-sign-up-form", {
        title: "Admin Sign Up",
        user: user,
        errors: errors.array(),
      });
      return;
    }
    // Catches if user tries to be an Admin with incorrect password
    else if (req.body.admin_password !== process.env.ADMIN_PASS) {
      var incorrectAdminError = "Incorrect Admin Password";
      customErrors.push(incorrectAdminError);

      // Render form again with custom error message.
      res.render("admin-sign-up-form", {
        title: "Admin Sign Up",
        user: user,
        customErrors: customErrors,
      });
    }

    // Checks if username already exists.
    const usernameExists = await User.findOne({
      username: req.body.username,
    }).exec();

    // Username already exists.
    if (usernameExists) {
      var usernameExistsError = "Username already exists";
      customErrors.push(usernameExistsError);

      // Render form again with custom error message.
      res.render("admin-sign-up-form", {
        title: "Admin Sign Up",
        user: user,
        customErrors: customErrors,
      });
      return;
    }

    // Creating hashed password for the valid user.
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          // Error, do something
        } else {
          // Adds hashed password to user object.
          user.password = hashedPassword;

          // Save new user and redirect to home page.
          await user.save();
          res.redirect("/");
        }
      });
    } catch (err) {
      return next(err);
    }
  }),
];
