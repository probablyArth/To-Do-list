const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const todosSchema = require("../models/todosSchema");
const Todos = mongoose.model("Todos", todosSchema);
const { User } = require("./user");

router.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;

  const user = await User.findOne({ username: username }).exec();
  if (!user || user.password !== password) {
    res.status(401);
    res.json({
      message: "Invalid Access.",
    });
    return;
  } else {
    const todos = await Todos.findOne({ userId: user._id }).exec();

    if (!todos) {
      await Todos.create({
        userId: user._id,
        todos: todosItems,
      });
    } else {
      todos.todos = todosItems.todos;
      await todos.save();
    }
    res.json({ message: "success" });
  }
});

router.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;

  const user = await User.findOne({ username: username }).exec();
  if (!user || user.password !== password) {
    res.status(401);
    res.json({
      message: "Invalid Access.",
    });
    return;
  } else {
    const { todos } = await Todos.findOne({ userId: user._id }).exec();
    res.json(todos);
  }
});

module.exports = router;
