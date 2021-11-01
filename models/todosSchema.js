const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
  userId: String,
  todos: [{ checked: Boolean, text: String }],
});

module.exports = todosSchema;
