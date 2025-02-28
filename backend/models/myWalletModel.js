const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myWalletSchema = new Schema(
    {
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

module.exports = mongoose.model("MyWallet", myWalletSchema);
