const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "Please add a comment"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null, // null means it's a top-level comment
  },
});

module.exports = mongoose.model("Comment", CommentSchema);
