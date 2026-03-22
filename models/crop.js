const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phMin: Number,
  phMax: Number,
  nitrogenMin: Number,
  daysToHarvest: Number,
  successRate: Number
});

module.exports = mongoose.model("Crop", cropSchema);