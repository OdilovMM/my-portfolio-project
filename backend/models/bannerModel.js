const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bannerSchema = new mongoose.Schema(
  {
    productId: {
      type: Schema.ObjectId,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Banner", bannerSchema);
