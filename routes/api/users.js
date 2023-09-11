//route has a connection issue with create route

const express = require("express");
const router = express.Router();
const {
  checkToken,
  dataController,
  apiController,
} = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// Post /api/users
router.post("/", dataController.signUp, apiController.auth);

// Post /api/users
router.post("/login", dataController.login, apiController.auth);

// Get /api/users/check-token
router.get("/check-token", ensureLoggedIn, checkToken);

module.exports = router;
