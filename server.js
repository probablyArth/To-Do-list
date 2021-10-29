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
  const { todos } = req.body;
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
