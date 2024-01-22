const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { DateTime } = require("luxon");

const PostSchema = new Schema({
  post: {
    type: String,
    required: true,
    minLength: 1,
  },
  post_date: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
