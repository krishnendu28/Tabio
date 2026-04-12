const express = require("express");
const Expense = require("../models/Expense");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 }).limit(100).lean();
    res.json(expenses);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { paidFrom, reason, amount, paidTo, date } = req.body;
    
    if (!reason || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Valid reason and amount are required." });
    }

    const created = await Expense.create({
      paidFrom: paidFrom || "PettyCash",
      reason,
      amount,
      paidTo: paidTo || "",
      date: date || new Date()
    });

    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
