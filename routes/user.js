const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const userSchema = require("../models/userSchema");
const User = mongoose.model("User", userSchema);

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).exec();

  if (user) {
    res.status(500);
    res.json({
      message: "User already exists.",
    });
    return;
  } else {
    await User.create({ username, password });
    res.json({
      message: "Success",
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).exec();

  if (!user || user.password !== password) {
    res.status(401);
    res.json({
      message: "Invalid Login.",
    });
    return;
  } else {
    res.json({
      message: "Success",
    });
  }
});

module.exports = { router, User };
