const Appointment = require("../models/appointment");

// 📅 Create Appointment
exports.createAppointment = async (req, res) => {
  try {
    const {
      patientName,
      contact,
      doctorId,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      paymentMode,
    } = req.body;

    const patientId = req.user.id; // from JWT

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      patientName,
      contact,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
      paymentMode,
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🧾 Get patient’s appointments
exports.getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ patientId: req.user.id })
      .populate("doctorId", "name specialization")
      .sort({ appointmentDate: -1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 💳 Update payment status (Admin/Doctor)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { paymentStatus },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    res.json({ message: "Payment status updated", appointment: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

    