const cartController = require("../../controllers/home/cartController");

const router = require("express").Router();

router.post("/add-cart", cartController.addToCart);
router.get("/get-customer-cart/:userId", cartController.getCustomerCart);

module.exports = router;
