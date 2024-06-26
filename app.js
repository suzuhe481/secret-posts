var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("./models/user");

// Set up a Mongoose connection
mongoose.set("strictQuery", false);

const dev_db_url = "placeholder";
const mongoDB = process.env.MONGODB_URI || dev_db_url;

// Wait for database connect. Logs error if fail to connect.
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

var indexRouter = require("./routes/index");
var postRouter = require("./routes/post");
var userRouter = require("./routes/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Using express-session middleware before passport initialization.
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

// Setting up the LocalStrategy.
// Takes an email and password and tries to find the user in the DB and makes sure
// the given password matches the user's password.
// Authenticates the user and moves on if successful.
// Note: The object containing the "email" string is used to use the email instead of the
// default username variable of LocalStrategy.
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }

        // Password comparison to use bcrypt's compare function.
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Following 2 functions are used in the background.
// Allows users to stay logged in by creating a cookie.
// Defines the information that passport is looking for when it creates and decodes the cookies.
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// Allows for the access of variables in all views without needing to manually pass it into every
// controller it's needed.
// req.user - The current user.
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Route for user to log in.
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/user/log-in",
    failureMessage: "Invalid email or password.",
  })
);

// Route for user to log out.
app.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "Page Not Found" });
});

module.exports = app;
