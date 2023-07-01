const Posts = require("../models/posts");
const User = require("../models/user");

//Create
exports.createPost = async (req, res) => {
  try {
    req.body.user = req.user._id;
    const posts = await Posts.create(req.body);
    req.user.posts
      ? req.user.Posts.addToSet({ _id: posts._id })
      : (req.user.Posts = [{ _id: posts._id }]);
    await req.user.save();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Show
exports.showPosts = async (req, res) => {
  try {
    const posts = await Posts.findOne({ id: req.params.id });
    req.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Index
exports.postsIndex = async (req, res) => {
  try {
    const posts = await Posts.find({});
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//User posts index
exports.userPostsIndex = async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.user._id });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Update User
exports.updatePosts = async (req, res) => {
  try {
    const posts = await Posts.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Delete User
exports.deletePosts = async (req, res) => {
  try {
    const posts = await Posts.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "your post has been removed!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
