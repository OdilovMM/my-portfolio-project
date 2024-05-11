const Admin = require("../models/adminModel");
const Seller = require("../models/sellerModel");
const Customer = require("../models/customerModel");
const formidable = require("formidable");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const adminMessage = require("../models/chat/adminSellerMessageSchema");
const Message = require("../models/chat/sellerCustomerMessageModel");
const { responseReturn } = require("../utils/response");
const paymentModel = require("../models/paymentModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.SECRET_KEY_STRIPE);

class paymentController {
  createSellerStripeAccount = async (req, res) => {
    const { id } = req;
    const uniqueId = uuidv4();

    console.log(id);

    try {
      const paymentInfo = await paymentModel.findOne({ sellerId: id });

      if (paymentInfo) {
        await paymentModel.deleteOne({ sellerId: id });
        const account = await stripe.accounts.create({ type: "express" });

        const accountLink = await stripe.accountLinks.create({
          account: account.id,
          refresh_url: "http://localhost:3000/refresh",
          return_url: `http://localhost:3000/success?activeCode=${uniqueId}`,
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
          refresh_url: "http://localhost:3000/refresh",
          return_url: `http://localhost:3000/success?activeCode=${uniqueId}`,
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
}

module.exports = new paymentController();
