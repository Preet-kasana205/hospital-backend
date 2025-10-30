const Billing = require("../models/billing");

exports.addBill = async (req, res) => {
  try {
    const bill = new Billing(req.body);
    await bill.save();
    res.status(201).json({ message: "Bill added successfully", bill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Billing.find();
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
