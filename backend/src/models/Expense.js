const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    paidFrom: { type: String, enum: ["PettyCash", "Bank", "Owner"], required: true },
    reason: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    paidTo: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Expense", expenseSchema);
