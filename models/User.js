const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,   // ✅ MUST exist
    unique: true,     // ✅ no duplicate users
    trim: true,
    lowercase: true
  },

  password: {
    type: String,
    required: true
  },

  name: {
    type: String,
    default: ""
  },

  age: {
    type: Number,
    default: null
  },

  location: {
    type: String,
    default: ""
  },

  address: {
    type: String,
    default: ""
  },

  taluka: {
    type: String,
    default: ""
  },

  district: {
    type: String,
    default: ""
  }
});

module.exports = mongoose.model("User", userSchema);
