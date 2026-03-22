// Load env from root folder
require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");
const Crop = require("../models/crop");  // make sure this path is correct
const crops = require("./crops");       // your crops.js data

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Seed function
async function seedCrops() {
  try {
    await Crop.deleteMany({}); // optional: remove old crops
    await Crop.insertMany(crops);
    console.log("✅ Crops seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
}

seedCrops();