const express = require("express");
const router = express.Router();

const { apiController } = require("../../controllers/api/users");
const { postController } = require("../../controllers/api/posts");

router.post("/", apiController.auth, postController.createPost);
router.put("/:id", apiController.auth, postController.updatePosts);
router.delete("/:id", apiController.auth, postController.deletePosts);

router.get("/feed", apiController.auth, postController.postsIndex);
router.get("/:id", apiController.auth, postController.userPostsIndex);
router.get("/:id", apiController.auth, postController.showPosts);

module.exports = router;
