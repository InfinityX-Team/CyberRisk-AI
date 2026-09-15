const mongoose = require("mongoose");

const assetSchema = new mongoose.Schema({
  name: String,
  businessUnit: String,
  criticality: String,
  value: Number,
  vulnPressure: Number,
  lef: Number,
  sle: Number,
  ale: Number,
});

module.exports = mongoose.model("Asset", assetSchema);
