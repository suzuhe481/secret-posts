const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minLength: 1,
  },
  last_name: {
    type: String,
    required: true,
    minLength: 1,
  },
  username: {
    type: String,
    required: true,
    minLength: 1,
  },
  password: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    minLength: 1,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  status: {
    type: String,
    required: true,
    enum: ["Member", "Member+", "Admin"],
  },
});

// Virtual for user's full name.
UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

// Virtual for user's url.
UserSchema.virtual("url").get(function () {
  return `/user/${this._id}`;
});

// Export module
module.exports = mongoose.model("User", UserSchema);
