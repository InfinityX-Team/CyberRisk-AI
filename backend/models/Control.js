const mongoose = require("mongoose");

const controlSchema = new mongoose.Schema({
  name: String,
  cost: Number,
  efficacy: Number,
  framework: String,
  clause: String,
});

module.exports = mongoose.model("Control", controlSchema);
