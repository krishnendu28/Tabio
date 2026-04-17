const express = require("express");
const Alert = require("../models/Alert");

const router = express.Router();

// Get all alerts
router.get("/", async (req, res, next) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 }).limit(50).lean();
    res.json(alerts);
  } catch (error) {
    next(error);
  }
});

// Mark alert as read
router.patch("/:id/read", async (req, res, next) => {
  try {
    const updated = await Alert.findByIdAndUpdate(
      req.params.id,
      { $set: { read: true } },
      { new: true }
    ).lean();
    if (!updated) {
      return res.status(404).json({ message: "Alert not found" });
    }
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// Create a new alert (e.g. from the UI)
router.post("/", async (req, res, next) => {
  try {
    const { message, type, tableId } = req.body;
    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }
    const created = await Alert.create({ message, type, tableId });
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
});

// Clear all alerts
router.delete("/", async (req, res, next) => {
  try {
    await Alert.deleteMany({});
    res.json({ message: "All alerts cleared" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
