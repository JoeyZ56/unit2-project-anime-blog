const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

//creating the user login Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  loggedIn: Boolean,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcyrpt.hash(this.password, 8);
  }
  next();
});
//creating a token so the user stays loggedin, expires in 24 hours from login
userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id }, "waifu", { expiresIn: "24h" });
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
