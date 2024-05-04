const orderController = require("../../controllers/home/orderController");

const router = require("express").Router();

router.post("/place-order", orderController.placeOrderSelectedProduct);
router.get(
  "/get-dashboard-data/:userId",
  orderController.getCustomerDashboardData
);
module.exports = router;
