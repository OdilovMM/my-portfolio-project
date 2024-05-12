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
router.get(
  "/get-seller-payment-details/:sellerId",
  authMiddleware,
  paymentController.getSellerPaymentDetails
);
router.post(
  "/send-withdrawal-request",
  authMiddleware,
  paymentController.PaymentRequest
);
router.get(
  "/get-admin-payment-request",
  authMiddleware,
  paymentController.getAdminPaymentRequest
);


router.put(
  "/admin-confirm-payment-request",
  authMiddleware,
  paymentController.adminConfirmPaymentRequest
);

module.exports = router;
