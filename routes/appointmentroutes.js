const express = require("express");
const {
  createAppointment,
  getAllAppointments,
  getPatientAppointments,
  getDoctorAppointments,
} = require("../controllers/appointmentController");
const auth = require("../middleware/auth"); // Import auth middleware

const router = express.Router();

// ALL appointment routes should be protected

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Protected (Patient)
router.post("/", auth, createAppointment);

// @route   GET /api/appointments
// @desc    Get all appointments (Admin)
// @access  Protected
router.get("/", auth, getAllAppointments);

// @route   GET /api/appointments/mypatient
// @desc    Get all appointments for the logged-in patient
// @access  Protected (Patient)
router.get("/mypatient", auth, getPatientAppointments);

// @route   GET /api/appointments/mydoctor
// @desc    Get all appointments for the logged-in doctor
// @access  Protected (Doctor)
router.get("/mydoctor", auth, getDoctorAppointments);

module.exports = router;
