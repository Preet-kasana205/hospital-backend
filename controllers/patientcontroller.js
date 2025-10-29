const Patient = require("../models/patient");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Register a new patient ---
exports.registerPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender, contact } = req.body;

    // 1. Check if user already exists
    let patient = await Patient.findOne({ email });
    if (patient) {
      return res.status(400).json({ message: "Patient already exists" });
    }

    // 2. Create new patient instance
    patient = new Patient({ name, email, password, age, gender, contact });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    patient.password = await bcrypt.hash(password, salt);

    // 4. Save to DB
    await patient.save();

    // 5. Return JWT (so they are auto-logged in)
    const payload = {
      user: {
        id: patient.id,
        role: "patient",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, message: "Patient registered successfully" });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Login a patient ---
exports.loginPatient = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. C eck if patient exists
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Return JWT
    const payload = {
      user: {
        id: patient.id,
        role: "patient",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token, message: "Login successful" });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get all patients (Protected) ---
exports.getAllPatients = async (req, res) => {
  try {
    // Only doctors or admins should probably see this, but for now, auth is generic
    const patients = await Patient.find().select("-password"); // Exclude password
    res.json(patients);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get a single patient by ID (Protected) ---
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Optional: Check if the logged-in user is this patient or a doctor
    // if (req.user.id !== patient.id && req.user.role !== 'doctor') {
    //   return res.status(403).json({ message: "Access denied" });
    // }

    res.json(patient);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};