const Posts = require("../../models/posts");

const postController = {
  //Create
  async createPost(req, res) {
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
  },
  //Show
  async showPosts(req, res) {
    try {
      const posts = await Posts.findOne({ id: req.params.id });
      req.json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //Index
  async postsIndex(req, res) {
    try {
      const posts = await Posts.find({});
      res.json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //User posts index
  async userPostsIndex(req, res) {
    try {
      const posts = await Posts.find({ user: req.user._id });
      res.json(posts);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  //Update User
  async updatePosts(req, res) {
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
  },

  //Delete User
  async deletePosts(req, res) {
    try {
      await Posts.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "your post has been removed!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = {
  postController,
};
