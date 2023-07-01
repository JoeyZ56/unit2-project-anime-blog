const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");
const app = express();
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("static"));
app.use(morgan("combined"));
app.use("/users", userRoutes);
app.use("/posts", postsRoutes);
app.use(methodOverride("_method"));

module.exports = app;
