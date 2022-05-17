const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: String,
  description: String,
  content: String,
  isPublished: Boolean,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Post", PostSchema);
