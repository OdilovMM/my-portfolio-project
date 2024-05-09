const chatController = require("../controllers/chatController.js");
const { authMiddleware } = require("../middlewares/authMiddleware.js");
const router = require("express").Router();

router.post("/add-customer-chat", chatController.addChatFriend);
router.post("/send-message-to-seller", chatController.sendMessageToSeller);
router.get("/get-customers/:sellerId", chatController.getCustomers);
router.get(
  "/get-customer-message/:customerId",
  authMiddleware,
  chatController.getCustomerMessage
);

module.exports = router;
