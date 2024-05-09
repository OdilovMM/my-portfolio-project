const chatController = require("../controllers/chatController.js");

const router = require("express").Router();

router.post("/add-customer-chat", chatController.addChatFriend);
router.post("/send-message-to-seller", chatController.sendMessageToSeller);
router.get("/get-customers/:sellerId", chatController.getCustomers);

module.exports = router;
