const mongoose = require("mongoose");

const adminSellerMessageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      default: "",
    },
    receiverId: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("adminSellerMessage", adminSellerMessageSchema);
