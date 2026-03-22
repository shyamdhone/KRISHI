require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Crop = require("../models/crop");
const allCrops = require("./crops");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Crop.deleteMany(); // optional: remove old data
    await Crop.insertMany(allCrops);

    console.log(`🌱 Inserted ${allCrops.length} crops into MongoDB Atlas`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Error:", err);
  });