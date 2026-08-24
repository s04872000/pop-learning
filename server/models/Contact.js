const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      default: "",
      trim: true
    },
    email: {
      type: String,
      default: "",
      trim: true
    },
    subject: {
      type: String,
      default: "",
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: "未處理"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
