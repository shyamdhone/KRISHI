const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/krishiApp")
.then(() => console.log("Database Connected"))
.catch(err => console.log(err));

const products = [
  {
    name: "Wheat Seeds",
    price: 500,
    category: "Seeds",
    stock: 50,
    image: "/images/wheatseed.png",
    description: "High quality wheat seeds"
  },
  {
    name: "Organic Fertilizer",
    price: 1200,
    category: "Fertilizer",
    stock: 30,
    image: "/images/organicferti.png",
    description: "Natural compost fertilizer"
  },
  {
    name: "Spray Pump",
    price: 2500,
    category: "Equipment",
    stock: 15,
    image: "/images/farmingpump.png",
    description: "Manual agricultural spray pump"
  },
  {
    name: "Drip Irrigation Kit",
    price: 3500,
    category: "Irrigation",
    stock: 10,
    image: "/images/cropirigation.png",
    description: "Water saving drip irrigation system"
  }
];

async function seedDB() {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("🌱 Products Added Successfully");
    mongoose.connection.close();
}

seedDB();