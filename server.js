const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;
const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGO_URI;

mongoose.connect(URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  app.listen(port, () => console.log(`App listening on port ${port}!`));
});

const todosRoutes = require("./routes/todos");
const userRoutes = require("./routes/user");

app.use(cors());
app.use(express.json());
app.use(todosRoutes);
app.use(userRoutes.router);
