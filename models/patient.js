const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // No two patients can have the same email
    lowercase: true, // Store email in lowercase
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"], // Restrict values
  },
  contact: {
    type: String,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);
