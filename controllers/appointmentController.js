
    const Appointment = require("../models/appointment");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

// --- Create a new appointment (Protected) ---
exports.createAppointment = async (req, res) => {
  try {
    // patientId should come from the logged-in user's token
    const patientId = req.user.id;
    const { doctorId, date } = req.body; // Client sends doctorId and ISO date string

    // 1. Basic validation
    if (!doctorId || !date) {
      return res.status(400).json({ message: "Doctor ID and date are required" });
    }

    // 2. Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 3. Check for scheduling conflict (basic)
    
    const appointmentDate = new Date(date);
    const existingAppointment = await Appointment.findOne({
      doctorId,
      date: appointmentDate,
    });

    if (existingAppointment) {
      return res.status(409).json({ message: "Time slot already booked" }); // 409 Conflict
    }

    // 4. Create and save new appointment
    const appointment = new Appointment({
      doctorId,
      patientId,
      date: appointmentDate,
    });

    await appointment.save();

    // Populate data for the response
    const newAppointment = await Appointment.findById(appointment.id)
      .populate("doctorId", "name specialization")
      .populate("patientId", "name contact");

    res
      .status(201)
      .json({
        message: "Appointment created successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get all appointments (Protected, Admin-only) ---
// THIS FUNCTION'S NAME IS RENAMED from getAppointments to getAllAppointments
exports.getAllAppointments = async (req, res) => {
  try {
    // This should probably be admin-only, but for now, we just check for auth
    const appointments = await Appointment.find()
      .populate("doctorId", "name specialization")
      .populate("patientId", "name contact");
    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get all appointments for a specific patient (Protected) ---
// THIS IS A NEW FUNCTION
exports.getPatientAppointments = async (req, res) => {
  try {
    // Get patient ID from the auth token
    const patientId = req.user.id;

    const appointments = await Appointment.find({ patientId })
      .populate("doctorId", "name specialization")
      .sort({ date: "asc" }); // Sort by date

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get all appointments for a specific doctor (Protected) ---
// THIS IS A NEW FUNCTION
exports.getDoctorAppointments = async (req, res) => {
  try {
    // Get doctor ID from the auth token
    const doctorId = req.user.id;

    // You should also check req.user.role === 'doctor'
    if (req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const appointments = await Appointment.find({ doctorId })
      .populate("patientId", "name contact age")
      .sort({ date: "asc" });

    res.json(appointments);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

