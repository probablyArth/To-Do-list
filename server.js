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
});

const User = mongoose.model("User", userSchema);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user.save();

  res.json({ message: "success" });
});
