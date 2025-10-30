const mongoose = require("mongoose");

const billingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  amount: Number,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "unpaid" }
});

module.exports = mongoose.model("Billing", billingSchema);
