const express = require("express");
const router = express.Router();
const { addBill, getAllBills } = require("../controllers/billingcontroller");

router.post("/add", addBill);
router.get("/", getAllBills);

module.exports = router;
