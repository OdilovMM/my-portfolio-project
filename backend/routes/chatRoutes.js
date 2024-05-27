const chatController = require("../controllers/chatController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const router = require("express").Router();

router.post("/add-customer-chat", chatController.addChatFriend);
router.post("/send-message-to-seller", chatController.sendMessageToSeller);
router.post(
  "/send-message-to-customer",
  authMiddleware,
  chatController.sendMessageToCustomer
);
router.get("/get-customers/:sellerId", chatController.getCustomers);
router.get(
  "/get-customer-message/:customerId",
  authMiddleware,
  chatController.getCustomerMessage
);
router.get(
  "/admin-get-sellers",
  authMiddleware,
  chatController.getSellersChatToAdmin
);
router.post(
  "/admin-message-to-seller",
  authMiddleware,
  chatController.adminMessageToSeller
);
router.get(
  "/get-admin-messages/:receiverId",
  authMiddleware,
  chatController.getAdminMessages
);
router.get(
  "/get-seller-messages",
  authMiddleware,
  chatController.getSellerMessages
);

module.exports = router;
