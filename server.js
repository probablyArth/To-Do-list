const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  todos: {},
});

const User = mongoose.model("User", userSchema);

const todosSchema = new mongoose.Schema({
  userId: String,
  todos: [{ checked: Boolean, text: String }],
});

const Todos = mongoose.model("Todos", todosSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  console.log(todosItems.newTodos);

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
      console.log(todosItems.newTodos);
      todos.todos = todosItems.newTodos;
      await todos.save();
    }
    res.json({ message: "success" });
  }
});

app.get("/todos", async (req, res) => {
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
