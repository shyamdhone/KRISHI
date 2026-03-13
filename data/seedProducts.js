const mongoose = require("mongoose");
const Product = require("../models/Product");

// --------------------
// MongoDB Connection
// --------------------
async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/krishiApp");
  console.log("✅ MongoDB Connected");
}

// --------------------
// Product Data
// --------------------
const products = [

  // 🌾 SEEDS
  {
    name: "HD-2967 Wheat Seed",
    category: "Seed",
    suitableCrops: ["Wheat"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "High",
    price: 2400,
    description: "High yield wheat seed with strong disease resistance.",
    image: "/images/wheatseed.png"
  },
  {
    name: "PBW-343 Wheat Seed",
    category: "Seed",
    suitableCrops: ["Wheat"],
    minPH: 6,
    maxPH: 7.2,
    nitrogenSupport: "High",
    price: 2200,
    description: "Popular wheat variety known for stable production.",
    image: "/images/wheatseed.png"
  },
  {
    name: "Basmati 1121 Rice Seed",
    category: "Seed",
    suitableCrops: ["Rice"],
    minPH: 5.5,
    maxPH: 6.8,
    nitrogenSupport: "Medium",
    price: 3400,
    description: "Premium basmati rice with long grain quality.",
    image: "/images/basmati.png"
  },
  {
    name: "Sona Masuri Rice Seed",
    category: "Seed",
    suitableCrops: ["Rice"],
    minPH: 5.5,
    maxPH: 7,
    nitrogenSupport: "Medium",
    price: 2800,
    description: "Medium grain rice suitable for local markets.",
    image: "/images/sunamasuri.jpg"
  },
  {
    name: "Hybrid Maize 900M",
    category: "Seed",
    suitableCrops: ["Maize"],
    minPH: 6,
    maxPH: 7,
    nitrogenSupport: "Medium",
    price: 2100,
    description: "High performance hybrid maize with strong cob size.",
    image: "/images/maize.png"
  },
  {
    name: "BT Cotton King",
    category: "Seed",
    suitableCrops: ["Cotton"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "High",
    price: 1800,
    description: "BT cotton resistant to major bollworms.",
    image: "/images/btcotton.png"
  },
  {
    name: "Soybean JS-335",
    category: "Seed",
    suitableCrops: ["Soybean"],
    minPH: 6,
    maxPH: 7,
    nitrogenSupport: "Medium",
    price: 2600,
    description: "High protein soybean suitable for oil extraction.",
    image: "/images/soya.png"
  },
  {
    name: "Groundnut G-20",
    category: "Seed",
    suitableCrops: ["Groundnut"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "Medium",
    price: 2500,
    description: "Drought-resistant groundnut variety.",
    image: "/images/groundnut.png"
  },
  {
    name: "Sunflower Hybrid SH-3322",
    category: "Seed",
    suitableCrops: ["Sunflower"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "Medium",
    price: 2900,
    description: "High oil content sunflower hybrid.",
    image: "/images/sunflower.png"
  },
  {
    name: "Bajra Pearl Millet Seed",
    category: "Seed",
    suitableCrops: ["Bajra"],
    minPH: 5.5,
    maxPH: 7.5,
    nitrogenSupport: "Low",
    price: 1900,
    description: "Suitable for dry and arid regions.",
    image: "/images/bajra.png"
  },

  // 🌱 FERTILIZERS
  {
    name: "Urea Fertilizer",
    category: "Fertilizer",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "High",
    price: 270,
    description: "Nitrogen-rich fertilizer to boost crop growth.",
    image: "/images/urae.png"
  },
  {
    name: "DAP Fertilizer",
    category: "Fertilizer",
    suitableCrops: ["Wheat", "Rice"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "High",
    price: 1350,
    description: "High phosphorus fertilizer for root development.",
    image: "/images/dap.png"
  },
  {
    name: "MOP Potash",
    category: "Fertilizer",
    suitableCrops: ["Vegetables", "Fruits"],
    minPH: 5.5,
    maxPH: 7.5,
    nitrogenSupport: "Medium",
    price: 1200,
    description: "Improves fruit size and quality.",
    image: "/images/mop.png"
  },
  {
    name: "Organic Compost",
    category: "Fertilizer",
    suitableCrops: ["All Crops"],
    minPH: 5.5,
    maxPH: 7.5,
    nitrogenSupport: "Low",
    price: 600,
    description: "Improves soil structure and fertility naturally.",
    image: "/images/organic.png"
  },
  {
    name: "Vermicompost Premium",
    category: "Fertilizer",
    suitableCrops: ["Vegetables"],
    minPH: 6,
    maxPH: 7,
    nitrogenSupport: "Medium",
    price: 800,
    description: "Earthworm processed organic fertilizer.",
    image: "/images/verm.png"
  },

  // 🛡 PESTICIDES
  {
    name: "Neem Oil Pesticide",
    category: "Pesticide",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 450,
    description: "Organic pest control solution.",
    image: "/images/neem.png"
  },
  {
    name: "Chlorpyrifos Insecticide",
    category: "Pesticide",
    suitableCrops: ["Cotton", "Maize"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "Low",
    price: 780,
    description: "Controls sucking and chewing insects.",
    image: "/images/chlor.png"
  },
  {
    name: "Imidacloprid 17.8%",
    category: "Pesticide",
    suitableCrops: ["Rice"],
    minPH: 6,
    maxPH: 7.5,
    nitrogenSupport: "Low",
    price: 900,
    description: "Effective systemic insecticide.",
    image: "/images/imid.png"
  },
  {
    name: "Carbendazim Fungicide",
    category: "Pesticide",
    suitableCrops: ["Wheat"],
    minPH: 6,
    maxPH: 7,
    nitrogenSupport: "Low",
    price: 650,
    description: "Prevents fungal diseases in crops.",
    image: "/images/carb.png"
  },
  {
    name: "Glyphosate Herbicide",
    category: "Pesticide",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 1100,
    description: "Non-selective weed control solution.",
    image: "/images/gy.png"
  },

  // 💧 IRRIGATION
  {
    name: "Drip Irrigation Kit",
    category: "Irrigation",
    suitableCrops: ["Vegetables"],
    minPH: 5.5,
    maxPH: 7.5,
    nitrogenSupport: "Medium",
    price: 3500,
    description: "Water-saving drip irrigation system.",
    image: "/images/drip.png"
  },
  {
    name: "Sprinkler Irrigation Set",
    category: "Irrigation",
    suitableCrops: ["Wheat"],
    minPH: 5.5,
    maxPH: 7.5,
    nitrogenSupport: "Medium",
    price: 4200,
    description: "Even water distribution across fields.",
    image: "/images/sprinkler.pmg.jpg"
  },

  // ⚙ EQUIPMENT
  {
    name: "Manual Spray Pump",
    category: "Equipment",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 1800,
    description: "Used for spraying pesticides and fertilizers.",
    image: "/images/manual.png"
  },
  {
    name: "Electric Spray Pump",
    category: "Equipment",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 3200,
    description: "Battery-operated spray pump for large farms.",
    image: "/images/electric.png"
  },
  {
    name: "Mini Power Tiller",
    category: "Equipment",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 25000,
    description: "Compact machine for small-scale farming.",
    image: "/images/minipower.pmg.jpg"
  },
  {
    name: "Hand Hoe Tool",
    category: "Equipment",
    suitableCrops: ["All Crops"],
    minPH: 5,
    maxPH: 8,
    nitrogenSupport: "Low",
    price: 600,
    description: "Traditional hand tool for soil preparation.",
    image: "/images/tool.png"
  }

];

// --------------------
// Seed Database
// --------------------
async function seedDB() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("🌱 Database Seeded Successfully!");
  } catch (err) {
    console.error("❌ Seeding Error:", err);
  } finally {
    mongoose.connection.close();
  }
}

// --------------------
// Run Seeder
// --------------------
connectDB()
  .then(() => seedDB())
  .catch(err => console.error(err));