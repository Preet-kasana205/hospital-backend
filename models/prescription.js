const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  medicines: [String],
  dosage: String,
  doctorName: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Prescription", prescriptionSchema);
