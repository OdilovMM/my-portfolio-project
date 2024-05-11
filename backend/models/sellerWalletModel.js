const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sellerWalletSchema = new Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SellerWallet", sellerWalletSchema);
