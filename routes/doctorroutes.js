const express = require("express");
const {
  registerDoctor,
  loginDoctor,
  getAllDoctors,
  getDoctorById,
} = require("../controllers/doctorcontroller");
const auth = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// @route   POST /api/doctors/register
// @desc    Register a new doctor
// @access  Public
router.post("/register", registerDoctor);

// @route   POST /api/doctors/login
// @desc    Login a doctor
// @access  Public
router.post("/login", loginDoctor);

// @route   GET /api/doctors
// @desc    Get all doctors
// @access  Public (so patients can see them)
router.get("/", getAllDoctors);

// @route   GET /api/doctors/:id
// @desc    Get a single doctor by ID
// @access  Public (so patients can see details)
router.get("/:id", getDoctorById);

module.exports = router;