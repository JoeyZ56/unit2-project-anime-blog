const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: mongoose.Schema.Types.ObjectId,
});

const Posts = mongoose.model("Posts", PostSchema);

module.exports = Posts;
