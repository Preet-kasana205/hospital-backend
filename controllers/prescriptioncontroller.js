const Prescription = require("../models/prescription");

// ✅ Create new prescription (doctor)
exports.createPrescription = async (req, res) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res
      .status(201)
      .json({ message: "Prescription created successfully", prescription });
  } catch (error) {
    console.error("Error creating prescription:", error.message);
    res.status(500).json({ error: "Server error while creating prescription" });
  }
};

// ✅ Get all prescriptions (admin)
exports.getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate("patient doctor", "name email");
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions:", error.message);
    res.status(500).json({ error: "Server error while fetching prescriptions" });
  }
};

// ✅ Get prescriptions for one patient (doctor/patient)
exports.getPrescriptionByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescriptions = await Prescription.find({ patient: patientId }).populate("doctor", "name email");
    if (prescriptions.length === 0) {
      return res.status(404).json({ message: "No prescriptions found for this patient" });
    }
    res.status(200).json(prescriptions);
  } catch (error) {
    console.error("Error fetching patient prescriptions:", error.message);
    res.status(500).json({ error: "Server error while fetching prescriptions" });
  }
};

// ✅ Delete prescription (admin)
exports.deletePrescription = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Prescription.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Prescription not found" });
    }
    res.status(200).json({ message: "Prescription deleted successfully" });
  } catch (error) {
    console.error("Error deleting prescription:", error.message);
    res.status(500).json({ error: "Server error while deleting prescription" });
  }
};
