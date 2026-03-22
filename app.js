require("dotenv").config();
const Article = require("./models/article");
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const nodemailer = require("nodemailer");
const allCrops = require("./data/crops"); 
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const axios = require("axios");
const session = require("express-session");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const Order = require("./models/order");
const Product = require("./models/product");
const User = require("./models/User");
const District = require("./models/district");
const app = express();

// ================= DATABASE =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ================= VIEW ENGINE =================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ================= MIDDLEWARE =================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: process.env.SESSION_SECRET || "krishisphere-dev-secret",
  resave: false,
  saveUninitialized: false
}));

// ✅ AUTH MIDDLEWARE ADDED HERE
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}
function isAdmin(req, res, next) {

  if (req.session.admin) {
    return next();
  }

  res.redirect("/admin/login");

}

// ✅ MAKE USER AVAILABLE IN ALL EJS FILES
app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

// ================= HOME =================
app.get("/", (req, res) => {
  res.redirect("/login");
});
app.get("/admin/login", (req, res) => {
  res.render("admin-login");
});

app.get("/home", isLoggedIn, async (req, res) => {

  try {

    const articles = await Article
      .find()
      .sort({ createdAt: -1 })
      .limit(3);

    res.render("listing/home", {
      user: req.session.user,
      articles
    });

  } catch (err) {

    console.error("Home page error:", err);

    res.render("listing/home", {
      user: req.session.user,
      articles: []
    });

  }

});

// ================= WEATHER =================
app.get("/weather", isLoggedIn, async (req, res) => {
  const { city, lat, lon } = req.query;
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const units = "metric";

  try {
    let params = { appid: apiKey, units };
    
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = city || "Mumbai";
    }

    const [weatherResponse, forecastResponse] = await Promise.all([
      axios.get("https://api.openweathermap.org/data/2.5/weather", { params }),
      axios.get("https://api.openweathermap.org/data/2.5/forecast", { params })
    ]);

    const weather = {
      city: weatherResponse.data.name,
      temp: weatherResponse.data.main.temp,
      humidity: weatherResponse.data.main.humidity,
      description: weatherResponse.data.weather[0].description,
      icon: weatherResponse.data.weather[0].icon
    };

    const forecast = [];
    const list = forecastResponse.data.list;

    for (let i = 7; i < list.length; i += 8) {
      forecast.push({
        date: new Date(list[i].dt * 1000).toLocaleDateString("en-US", { weekday: "short" }),
        temp: list[i].main.temp,
        description: list[i].weather[0].description,
        icon: list[i].weather[0].icon
      });
      if (forecast.length === 4) break;
    }

    res.render("listing/weather", {
      weather,
      forecast,
      error: null
    });

  } catch (err) {
    console.error("Weather API ERROR:", err.response?.data || err.message);

    res.render("listing/weather", {
      weather: null,
      forecast: [],
      error: "Could not find that location. Please try again."
    });
  }
});

// ================= PROFILE =================

// ✅ GET PROFILE PAGE ADDED
app.get("/profile", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.session.user.id);
  res.render("listing/profile", { user });
});

// ✅ UPDATE PROFILE
app.post("/profile", isLoggedIn, async (req, res) => {
  const { name, age, location, address, taluka, district } = req.body;

  await User.findByIdAndUpdate(req.session.user.id, {
    name,
    age,
    location,
    address,
    taluka,
    district
  });

  res.redirect("/home");
});

// ================= AUTH =================
app.get("/login", (req, res) => {
  res.render("listing/login", { error: null });
});

app.get("/signup", (req, res) => {
  res.render("listing/signup", { error: null });
});
app.get("/admin/dashboard", isAdmin, async (req, res) => {

  const articles = await Article.find().sort({ createdAt: -1 });

  res.render("admin-dashboard", { articles });

});
app.get("/admin/articles/delete/:id", isAdmin, async (req, res) => {

  await Article.findByIdAndDelete(req.params.id);

  res.redirect("/admin/dashboard");

});
app.get("/admin/articles/edit/:id", isAdmin, async (req, res) => {

  const article = await Article.findById(req.params.id);

  res.render("edit-article", { article });

});
app.get("/articles", async (req, res) => {

  const articles = await Article.find().sort({ createdAt: -1 });

  res.render("articles", { articles });

});

app.get("/articles/:id", async (req, res) => {

  const article = await Article.findById(req.params.id);

  res.render("article-detail", { article });

});
app.get("/admin/articles/new", isAdmin, (req, res) => {
  res.render("new-article");
});
// ================= CROP PAGE =================


// ================= DISTRICT GRAPHS =================
app.get("/district/:name", async (req, res) => {
  try {
    const districtName = req.params.name;

    const district = await District.findOne({
      district: new RegExp("^" + districtName + "$", "i")
    });

    if (!district) {
      return res.send("District not found");
    }

    res.render("listing/districtGraphs", { district });

  } catch (err) {
    console.error(err);
    res.send("Error loading district graphs");
  }
});
app.get("/trend/:district/:type/:item", async (req, res) => {

  const { district, type, item } = req.params;

  try {

    const data = await District.findOne({
      district: new RegExp("^" + district + "$", "i")
    });

    if (!data) {
      return res.send("District not found");
    }

    let list = [];

    if (type === "crop") list = data.crops;
    else if (type === "vegetable") list = data.vegetables;
    else if (type === "fruit") list = data.fruits;

    if (!list || list.length === 0) {
      return res.send("No data found for this category");
    }

    const selected = list.find(i => i.name === item);

    if (!selected) {
      return res.send("Item not found");
    }

    res.render("trend", {
      district: data.district,
      type,
      item: selected
    });

  } catch (err) {
    console.log(err);
    res.send("Server Error");
  }

});
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("listing/signup", {
        error: "All fields are required"
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.render("listing/signup", {
        error: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword
    });

    // ✅ Create session (auto login after signup)
    req.session.user = {
      id: newUser._id,
      email: newUser.email
    };

    // ✅ Go to home page
    res.redirect("/home");

  } catch (err) {
    console.error(err);
    res.render("listing/signup", { error: "Signup failed" });
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;

    /* ================= ADMIN LOGIN ================= */

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {

      req.session.admin = true;

      return res.redirect("/admin/dashboard");

    }

    /* ================= USER LOGIN ================= */

    const user = await User.findOne({ email });

    if (!user) {
      return res.render("listing/login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.render("listing/login", { error: "Invalid password" });
    }

    req.session.user = {
      id: user._id,
      email: user.email
    };

    res.redirect("/home");

  } catch (err) {

    console.error(err);

    res.render("listing/login", { error: "Login failed" });

  }
});
app.post("/admin/login", (req, res) => {

  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    req.session.admin = true;
    res.redirect("/admin/dashboard");
  } else {
    res.send("Invalid Admin Login");
  }

});
// ================= ADMIN CREATE ARTICLE =================
// ================= ADMIN CREATE ARTICLE =================
app.post("/admin/articles", isAdmin, async (req, res) => {

  const { title, description, image, content, category } = req.body;

  const isTop = req.body.isTop === "on";

  await Article.create({
    title,
    description,
    image,
    content,
    category,
    isTop
  });

  res.redirect("/admin/dashboard");

});

// ================= LOGOUT =================
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// ================= PRODUCTS =================
app.get("/products", isLoggedIn, async (req, res) => {
  try {
    const { crop, ph, nitrogen } = req.query;

    let query = {};

    if (crop) {
      query.suitableCrops = { $in: [crop] };
    }

    if (ph) {
      query.$and = [
        { minPH: { $lte: Number(ph) } },
        { maxPH: { $gte: Number(ph) } }
      ];
    }

    if (nitrogen) {
      query.nitrogenSupport = nitrogen;
    }

    const products = await Product.find(query);

    res.render("listing/products", {
      products,
      crop: crop || "",
      ph: ph || "",
      nitrogen: nitrogen || ""
    });

  } catch (err) {
    console.error("Product Page Error:", err);
    res.send("Error loading products");
  }
});

app.get("/products/:id", isLoggedIn, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.send("Product not found");
    }

    res.render("listing/productDetail", { product });

  } catch (err) {
    console.error(err);
    res.send("Error loading product");
  }
});

// ================= CROP PAGE =================
app.get("/crop", isLoggedIn, async (req, res) => {
  try {
    const districts = await District.find({}, { district: 1, _id: 0 });

    res.render("listing/crop", {
      districts
    });
  } catch (err) {
    console.error(err);
    res.send("Failed to load crop page");
  }
});
const cropDatabase = require("./data/crops");

app.post("/crop/data", (req, res) => {
  try {
    const { nitrogen, phosphorus, potassium, ph } = req.body;

    const N = Number(nitrogen);
    const P = Number(phosphorus);
    const K = Number(potassium);
    const PH = Number(ph);

    function calculateMatch(crop) {
      let score = 0;

      const idealPH = (crop.phMin + crop.phMax) / 2;
      const maxPHDiff = (crop.phMax - crop.phMin) / 2;

      const phDiff = Math.abs(PH - idealPH);

      let phScore;

      if (phDiff <= maxPHDiff) {
        phScore = 40 - (phDiff / maxPHDiff) * 10;
      } else {
        phScore = Math.max(0, 30 - phDiff * 15);
      }

      score += phScore;

      score += Math.max(0, 20 - Math.abs(N - crop.nitrogenMin));
      score += Math.max(0, 20 - Math.abs(P - crop.phosphorusMin));
      score += Math.max(0, 20 - Math.abs(K - crop.potassiumMin));

      return Math.round(score);
    }

    const results = cropDatabase.map(crop => ({
      ...crop,
      matchPercentage: calculateMatch(crop),
      minPH: crop.phMin,
      maxPH: crop.phMax,
      days: crop.daysToHarvest
    }));

    const crops = results
      .filter(c => c.type === "crop")
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 4);

    const fruits = results
      .filter(c => c.type === "fruit")
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 4);

    const vegetables = results
      .filter(c => c.type === "vegetable")
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
      .slice(0, 4);

    res.json({
      crops,
      fruits,
      vegetables
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});
app.post("/buy/:id", async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    const user = await User.findById(req.session.user.id);
    if (!user) {
      return res.redirect("/login");
    }

    if (!user.address || !user.taluka || !user.district) {
      return res.redirect("/profile");
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.send("Product not found");
    }

    const safeName =
      user.name && user.name.trim() !== "" ? user.name : "User";

    const quantity = 1;
    const totalPrice = product.price * quantity;

    // 🔐 Generate confirmation token
    const token = crypto.randomBytes(32).toString("hex");

    // 📝 Save TEMP order (not confirmed)
    await Order.create({
      product: product._id,
      user: user._id,
      quantity,
      totalPrice,
      status: "pending",
      confirmationToken: token
    });

    // 📧 Send confirmation email to USER
const confirmLink = `http://localhost:8080/confirm-order/${token}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "✅ Confirm Your Order",
      html: `
        <h3>Hello ${safeName}</h3>

        <h4>Product Details</h4>
        <p><b>Name:</b> ${product.name}</p>
        <p><b>Price:</b> ₹${product.price}</p>

        <h4>Delivery Address</h4>
        <p>
          ${user.address}<br>
          ${user.taluka}, ${user.district}
        </p>

        <p><b>Total:</b> ₹${totalPrice}</p>

        <br>
        <a href="${confirmLink}"
           style="padding:10px 15px;background:#28a745;color:#fff;text-decoration:none;">
           Confirm Order
        </a>
      `
    });

    res.send("Confirmation email sent. Please check your email.");

  } catch (err) {
    console.error("BUY ERROR:", err);
    res.send("Error placing order");
  }
});
app.post("/admin/articles/update/:id", isAdmin, async (req, res) => {

  const { title, description, image, content, category } = req.body;

  const isTop = req.body.isTop === "on";

  await Article.findByIdAndUpdate(req.params.id, {
    title,
    description,
    image,
    content,
    category,
    isTop
  });

  res.redirect("/admin/dashboard");

});

app.get("/confirm-order/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const order = await Order.findOne({ confirmationToken: token })
      .populate("product")
      .populate("user");

    if (!order) {
      return res.send("Invalid or expired confirmation link.");
    }

    if (order.status === "confirmed") {
      return res.send("Order already confirmed.");
    }

    // 🚨 Ensure address exists
    if (!order.user.address || !order.user.district) {
      return res.send("Please update your full address in profile before confirming order.");
    }

    // ✅ Confirm order
    order.status = "confirmed";
    order.confirmationToken = null;
    await order.save();

    /* ============================
       1️⃣ EMAIL TO USER (FINAL)
    ============================ */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: order.user.email,
      subject: "✅ Order Confirmed Successfully",
      html: `
        <h2>Your Order is Confirmed 🎉</h2>

        <h3>🛒 Product Details</h3>
        <p><strong>Product:</strong> ${order.product.name}</p>
        <p><strong>Quantity:</strong> ${order.quantity}</p>
        <p><strong>Total Price:</strong> ₹${order.totalPrice}</p>

        <hr/>

        <h3>📦 Shipping Address</h3>
        <p><strong>Name:</strong> ${order.user.name}</p>
        <p><strong>Address:</strong> ${order.user.address}</p>
        <p><strong>Taluka:</strong> ${order.user.taluka}</p>
        <p><strong>District:</strong> ${order.user.district}</p>
        <p><strong>Location:</strong> ${order.user.location}</p>

        <p>Thank you for shopping with us ❤️</p>
      `
    });

    /* ============================
       2️⃣ EMAIL TO ADMIN (SECOND EMAIL)
    ============================ */
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "📦 New Order Confirmed",
      html: `
        <h2>New Order Confirmed</h2>

        <h3>👤 Customer Details</h3>
        <p><strong>Name:</strong> ${order.user.name}</p>
        <p><strong>Email:</strong> ${order.user.email}</p>

        <h3>📦 Address</h3>
        <p>${order.user.address}</p>
        <p>${order.user.taluka}, ${order.user.district}</p>
        <p>${order.user.location}</p>

        <hr/>

        <h3>🛒 Product</h3>
        <p><strong>${order.product.name}</strong></p>
        <p>Quantity: ${order.quantity}</p>
        <p>Total: ₹${order.totalPrice}</p>
      `
    });

    // ✅ Redirect to success page
    res.redirect("/order-success");

  } catch (err) {
    console.error("CONFIRM ERROR:", err);
    res.send("Error confirming order");
  }
});
app.get("/order-success", (req, res) => {
  res.send(`
    <h2>✅ Order Confirmed Successfully!</h2>
    <p>Your order has been confirmed and details have been sent to your email.</p>
    <p>Our team will contact you soon.</p>
    <br/>
    <a href="/product">Go to Home</a>
  `);
});

// ================= SERVER =================
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});