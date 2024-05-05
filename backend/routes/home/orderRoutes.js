const orderController = require("../../controllers/home/orderController");

const router = require("express").Router();

router.post("/place-order", orderController.placeOrderSelectedProduct);
router.get(
  "/get-dashboard-data/:userId",
  orderController.getCustomerDashboardData
);
router.get("/get-orders/:userId/:status", orderController.getAllOrdersByStatus);
router.get("/get-orders/:userId/:status", orderController.getAllOrdersByStatus);
router.get("/get-order-detail/:orderId", orderController.getOrderDetail);
module.exports = router;
