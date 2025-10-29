const express = require("express");
const {
  registerPatient,
  loginPatient,
  getAllPatients,
  getPatientById,
} = require("../controllers/patientcontroller");
const auth = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// @route   POST /api/patients/register
// @desc    Register a new patient
// @access  Public
router.post("/register", registerPatient);

// @route   POST /api/patients/login
// @desc    Login a patient
// @access  Public
router.post("/login", loginPatient);

// @route   GET /api/patients
// @desc    Get all patients
// @access  Protected (Requires token)
router.get("/", auth, getAllPatients);

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID
// @access  Protected
router.get("/:id", auth, getPatientById);

module.exports = router;

