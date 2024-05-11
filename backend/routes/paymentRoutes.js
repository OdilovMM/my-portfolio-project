const paymentController = require("../controllers/paymentController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const router = require("express").Router();

router.get(
  "/create-seller-stripe-account",
  authMiddleware,
  paymentController.createSellerStripeAccount
);
router.patch(
  "/activate-seller-stripe-account/:activeCode",
  authMiddleware,
  paymentController.activateAccount
);

module.exports = router;
