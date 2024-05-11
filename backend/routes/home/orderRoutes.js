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
router.get("/get-admin-order", orderController.getAdminOrders);
router.patch(
  "/admin-update-order-status/:orderId",
  orderController.adminOrderUpdateStatus
);
router.get(
  "/get-admin-order-detail/:orderId",
  orderController.getSingleOrderDetail
);
module.exports = router;
