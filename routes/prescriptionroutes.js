const express = require("express");
const router = express.Router();
const { addPrescription, getPrescriptions } = require("../controllers/prescriptioncontroller");

router.post("/add", addPrescription);
router.get("/", getPrescriptions);

module.exports = router;
