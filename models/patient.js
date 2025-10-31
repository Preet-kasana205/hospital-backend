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
    unique: true,
    lowercase: true,
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
    enum: ["Male", "Female", "Other"],
  },
  contact: {
    type: String,
  },

  // 👇 NEW MEDICAL FIELDS 👇
  BP: {
    type: String, // Example: "120/80"
  },
  heartBeat: {
    type: Number, // Example: 72
  },
  glucose: {
    type: Number, // mg/dL
  },
  insulin: {
    type: Number, // μU/mL
  },
  height: {
    type: Number, // in cm
  },
  weight: {
    type: Number, // in kg
  },
  majorDiseasesOrSurgeries: {
    type: String, // e.g., "Diabetes, Heart Surgery (2022)"
  },

  registeredAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Patient", patientSchema);

