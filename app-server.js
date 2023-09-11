const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const favicon = require('serve-favicon');
const logger = require("morgan");

app.use(cors()); //connect backend to frontend

app.use(express.json()); // req.body
app.use((req, res, next) => {
  res.locals.data = {};
  next();
});
app.use(logger("dev"));
// app.use(favicon(path.join(__dirname, 'public', 'favicon', 'favicon.ico')));
app.use(express.static(path.join(__dirname, "public")));
// Check if token and create req.user
app.use(require("./config/checkToken"));

// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));
// Protect the API routes below from anonymous users
const ensureLoggedIn = require("./config/ensureLoggedIn");
app.use("/api/posts", ensureLoggedIn, require("./routes/api/posts"));

app.get("/api/home", (req, res) => {
  res.json({ message: "font and back are connected" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
