const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["admin", "doctor", "staff"], default: "staff" }
});

module.exports = mongoose.model("Admin", adminSchema);
