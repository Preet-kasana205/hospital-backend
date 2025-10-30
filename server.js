const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
// Updated path to be inside 'config' folder
const connectDB = require("./config/db");

// Load config
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// Connect Database
connectDB();

// --- Routes ---
// All route paths are updated to match the new file structure
app.use("/api/patients", require("./routes/patientroutes"));
app.use("/api/doctors", require("./routes/doctorroutes"));
app.use("/api/appointments", require("./routes/appointmentroutes"));
app.use("/api/billing", require("./routes/billingroutes"));
app.use("/api/prescription", require("./routes/prescriptionroutes"));

app.get("/", (req, res) => {
    res.send("Healthcare Appointment Scheduling API is running");
});

// --- Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
