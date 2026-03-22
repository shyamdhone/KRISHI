const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },

  minPH: Number,
  maxPH: Number,

  minN: Number,
  maxN: Number,

  minP: Number,
  maxP: Number,

  minK: Number,
  maxK: Number,

  daysToHarvest: Number,
  successRate: Number,

  type: {
    type: String,
    enum: ["crop", "vegetable", "fruit"],
    default: "crop"
  }
});

module.exports = mongoose.model("Crop", cropSchema);