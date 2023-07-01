const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const postsController = require("../controllers/postsController");

router.post("/", userController.auth, postsController.createPost);
router.put("/:id", userController.auth, postsController.updatePosts);
router.delete("/:id", userController.auth, postsController.deletePosts);

router.get("/feed", userController.auth, postsController.postsIndex);
router.get("/:id", userController.auth, postsController.userPostsIndex);
router.get("/:id", userController.auth, postsController.showPosts);

module.exports = router;
