const Seller = require("../models/sellerModel");
const SellerWallet = require("../models/sellerWalletModel");
const WithdrawRequest = require("../models/withdrawReqModel");
const { responseReturn } = require("../utils/response");
const paymentModel = require("../models/paymentModel");
const {
  mongo: { ObjectId },
} = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

class paymentController {
  createSellerStripeAccount = async (req, res) => {
    const { id } = req;
    const uniqueId = uuidv4();
    try {
      const paymentInfo = await paymentModel.findOne({ sellerId: id });
      if (paymentInfo) {
        await paymentModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${FRONT_END_URL}/refresh`,
          return_url: `${FRONT_END_URL}/success?activeCode=${uniqueId}`,
          type: "account_onboarding",
        });
        await paymentModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uniqueId,
        });
        responseReturn(res, 201, { url: accountLink.url });
      } else {
        const account = await stripe.accounts.create({ type: "express" });
        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: `${FRONT_END_URL}/refresh`,
          return_url: `${FRONT_END_URL}/success?activeCode=${uniqueId}`,
          type: "account_onboarding",
        });
        await paymentModel.create({
          sellerId: id,
          stripeId: account.id,
          code: uniqueId,
        });
        console.log(accountLink);
        responseReturn(res, 201, { url: accountLink.url });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  activateAccount = async (req, res) => {
    const { activeCode } = req.params;
    const { id } = req;
    try {
      const userStripeInfo = await paymentModel.findOne({ code: activeCode });
      if (userStripeInfo) {
        await Seller.findByIdAndUpdate(id, {
          payment: "active",
        });
        return responseReturn(res, 200, { message: "payment Activated" });
      } else {
        return responseReturn(res, 404, { message: "payment Active Fails" });
      }
    } catch (error) {
      console.log(error);
      return responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
  sumAmount = (data) => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum = sum + data[i].amount;
    }
    return sum;
  };
  getSellerPaymentDetails = async (req, res) => {
    const { sellerId } = req.params;

    try {
      const payments = await SellerWallet.find({ sellerId });

      const pendingWithdraws = await WithdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "pending",
            },
          },
        ],
      });

      const successWithdraws = await WithdrawRequest.find({
        $and: [
          {
            sellerId: {
              $eq: sellerId,
            },
          },
          {
            status: {
              $eq: "success",
            },
          },
        ],
      });

      const pendingAmount = this.sumAmount(pendingWithdraws);
      const withdrawAmount = this.sumAmount(successWithdraws);
      const totalAmount = this.sumAmount(payments);

      let availableAmount = 0;

      if (totalAmount > 0) {
        availableAmount = totalAmount - (pendingAmount + withdrawAmount);
      }

      responseReturn(res, 200, {
        totalAmount,
        pendingAmount,
        withdrawAmount,
        availableAmount,
        pendingWithdraws,
        successWithdraws,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error);
    }
  };
  PaymentRequest = async (req, res) => {
    const { amount, sellerId } = req.body;

    try {
      const withdrawal = await WithdrawRequest.create({
        sellerId,
        amount: parseInt(amount),
      });
      responseReturn(res, 201, {
        withdrawal,
        message: "Successfully withdrawal",
      });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  getAdminPaymentRequest = async (req, res) => {
    try {
      const withdrawalRequest = await WithdrawRequest.find({
        status: "pending",
      });
      responseReturn(res, 201, { withdrawalRequest });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };

  adminConfirmPaymentRequest = async (req, res) => {
    const { paymentId } = req.body;
    console.log(paymentId);

    try {
      const payment = await WithdrawRequest.findById(paymentId);
      const { stripeId } = await paymentModel.findOne({
        sellerId: new ObjectId(payment.sellerId),
      });

      await stripe.transfers.create({
        amount: payment.amount * 100,
        currency: "usd",
        destination: stripeId,
      });

      await WithdrawRequest.findByIdAndUpdate(paymentId, {
        status: "success",
      });

      responseReturn(res, 201, { payment, message: "Payment Confirmed" });
    } catch (error) {
      console.log(error);
      console.log(error.message);
      responseReturn(res, 500, { message: "Internal Server Error" });
    }
  };
}

module.exports = new paymentController();
