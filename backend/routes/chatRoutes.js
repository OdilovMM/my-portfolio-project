const chatController = require("../controllers/chatController.js");

const router = require("express").Router();

router.post("/add-customer-chat", chatController.addChatFriend);
router.post("/send-message-to-seller", chatController.sendMessageToSeller);

module.exports = router;
