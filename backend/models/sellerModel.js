const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: "seller",
    },
    status: {
      type: String,
      default: "pending",
    },
    payment: {
      type: String,
      default: "inactive",
    },
    method: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    shopInfo: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

sellerSchema.index(
  {
    name: "text",
    email: "text",
    status: "text",
    payment: "text",
    shopInfo: "text",
  },
  {
    weights: {
      name: 5,
      email: 5,
      status: 5,
      payment: 5,
      shopInfo: 5,
    },
  }
);

module.exports = mongoose.model("Seller", sellerSchema);
