const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionByPatient,
  deletePrescription
} = require("../controllers/prescriptioncontroller");
const auth = require("../middleware/auth");

// create new prescription (doctor)
router.post("/", auth, createPrescription);

// get all prescriptions (admin)
router.get("/", auth, getAllPrescriptions);

// get prescriptions for one patient (doctor/patient)
router.get("/:patientId", auth, getPrescriptionByPatient);

// delete prescription (admin)
router.delete("/:id", auth, deletePrescription);

module.exports = router;
