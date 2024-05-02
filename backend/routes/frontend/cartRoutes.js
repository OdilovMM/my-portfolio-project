const cartController = require("../../controllers/home/cartController");

const router = require("express").Router();

router.post("/add-cart", cartController.addToCart);
// router.post("/remove-cart", cartController.removeFromCart);

module.exports = router;
