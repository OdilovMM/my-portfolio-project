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
router.get("/get-seller-order/:sellerId", orderController.getSellerOrders);
router.patch(
  "/admin-update-order-status/:orderId",
  orderController.adminOrderUpdateStatus
);
router.patch(
  "/seller-update-order-status/:orderId",
  orderController.sellerOrderUpdateStatus
);
router.get(
  "/get-admin-order-detail/:orderId",
  orderController.getSingleOrderDetail
);
router.get("/get-seller-single-order-detail/:orderId", orderController.getSellerSingleOrderDetail );
router.post("/create-payment", orderController.customerOrderMake );
module.exports = router;
