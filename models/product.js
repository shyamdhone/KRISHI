const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: String,

  suitableCrops: [String],   // Array

  minPH: Number,
  maxPH: Number,

  nitrogenSupport: String,

  price: {
    type: Number,
    required: true
  },

  description: String,

  image: String
});

module.exports = mongoose.model("Product", productSchema);