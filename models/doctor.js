const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  contact: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doctor", doctorSchema);
