const Doctor = require("../models/doctor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// --- Register a new doctor ---
exports.registerDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, experience, contact } = req.body;

    // 1. Check if doctor already exists
    let doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    // 2. Create new doctor
    doctor = new Doctor({
      name,
      email,
      password,
      specialization,
      experience,
      contact,
    });

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    doctor.password = await bcrypt.hash(password, salt);

    // 4. Save to DB
    await doctor.save();

    // 5. Return JWT
    const payload = {
      user: {
        id: doctor.id,
        role: "doctor",
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, message: "Doctor registered successfully" });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Login a doctor ---
exports.loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if doctor exists
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Return JWT
    const payload = {
      user: {
        id: doctor.id,
        role: "doctor",
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

// --- Get all doctors (Public or Protected, your choice) ---
exports.getAllDoctors = async (req, res) => {
  try {
    // This can be public, so patients can see doctors before signing up
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server error" });
  }
};

// --- Get a single doctor by ID (Public or Protected) ---
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.json(doctor);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ message: "Doctor not found" });
    }
    res.status(500).json({ error: "Server error" });
  }
};
