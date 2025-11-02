const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAppointment,
  getMyAppointments,
  updatePaymentStatus,
} = require("../controllers/appointmentController");

// Patient books appointment
router.post("/", auth, createAppointment);

// Patient views their appointments
router.get("/myappointments", auth, getMyAppointments);

// Admin/Doctor updates payment status
router.put("/:id/payment", auth, updatePaymentStatus);

module.exports = router;
