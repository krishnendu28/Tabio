const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
    type: { type: String, enum: ["Info", "Warning", "Error", "Request"], default: "Info" },
    read: { type: Boolean, default: false },
    tableId: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Alert", alertSchema);
