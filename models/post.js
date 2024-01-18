const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
model.exports = mongoose.model("Post", PostSchema);
