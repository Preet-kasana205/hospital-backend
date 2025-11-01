const Prescription = require("../models/prescription");

exports.createPrescription = async (req, res) => {
  try {
    const { patientId, appointmentId, diagnosis, medications, advice } = req.body;
    const doctorId = req.user.id; // from JWT (role: doctor)

    const prescription = await Prescription.create({
      patientId,
      doctorId,
      appointmentId,
      diagnosis,
      medications,
      advice,
    });

    res.status(201).json({ message: "Prescription created", prescription });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPatientPrescriptions = async (req, res) => {
  try {
    const patientId = req.user.id;
    const prescriptions = await Prescription.find({ patientId })
      .populate("doctorId", "name specialization")
      .sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
