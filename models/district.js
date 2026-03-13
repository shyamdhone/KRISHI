const mongoose = require("mongoose");

// ===================== SCHEMAS =====================

const itemSchema = new mongoose.Schema({
  name: String,
  prices: {
    2022: Number,
    2023: Number,
    2024: Number,
    2025: Number
  }
}, { _id: false });

const soilSchema = new mongoose.Schema({
  type: String,
  percentage: Number
}, { _id: false });

const districtSchema = new mongoose.Schema({
  district: { type: String, required: true, unique: true },
  soil: [soilSchema],
  crops: [itemSchema],
  vegetables: [itemSchema],
  fruits: [itemSchema],

  // 🌾 NEW POPULAR FIELDS
  popularCrops: [itemSchema],
  popularVegetables: [itemSchema],
  popularFruits: [itemSchema],
});

module.exports = mongoose.model("District", districtSchema);