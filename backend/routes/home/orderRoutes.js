const orderController = require("../../controllers/home/orderController");

const router = require("express").Router();

router.post("/place-order", orderController.placeOrderSelectedProduct);

module.exports = router;
