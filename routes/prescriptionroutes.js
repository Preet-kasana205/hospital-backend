const express = require("express");
const { createPrescription, getPatientPrescriptions } = require("../controllers/prescriptioncontroller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createPrescription); // Doctor creates prescription
router.get("/myprescriptions", auth, getPatientPrescriptions); // Patient views their prescriptions

module.exports = router;

