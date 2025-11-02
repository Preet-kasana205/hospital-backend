
const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getMyAppointments,
  updatePaymentStatus,
  getAllAppointments
} = require("../controllers/appointmentscontroller");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createAppointment);
router.get("/myappointments", authMiddleware, getMyAppointments);
router.get("/", authMiddleware, getAllAppointments); // ✅ new route
router.put("/:id/payment", authMiddleware, updatePaymentStatus);

module.exports = router;
