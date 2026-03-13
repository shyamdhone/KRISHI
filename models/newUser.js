const mongoose = require("mongoose");

const newUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// 👇 This creates `newusers` collection
module.exports = mongoose.model("NewUser", newUserSchema);
