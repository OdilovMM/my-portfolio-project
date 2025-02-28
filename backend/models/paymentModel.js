const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new mongoose.Schema(
  {
    sellerId: {
      type: Schema.ObjectId,
      required: true,
    },
    stripeId: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
