const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createAppointment,
  getMyAppointments,
  updatePaymentStatus,
  getAllAppointments
} = require("../controllers/appointmentController");

// Patient books appointment
router.post("/", auth, createAppointment);

// Patient views their appointments
router.get("/myappointments", auth, getMyAppointments);
router.get("/", authMiddleware, getAllAppointments);

// Admin/Doctor updates payment status
router.put("/:id/payment", auth, updatePaymentStatus);

module.exports = router;
