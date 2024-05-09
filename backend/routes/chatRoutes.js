const chatController = require("../controllers/chatController.js");

const router = require("express").Router();

router.post("/add-customer-chat", chatController.addChatFriend);

module.exports = router;
