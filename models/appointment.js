const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  // Use a single Date object. This stores both date and time.
  // The client should send an ISO string (e.g., "2025-10-30T14:30:00.000Z")
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    // Use enum to restrict possible values
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
module.exports = mongoose.model("Appointment", appointmentSchema);
