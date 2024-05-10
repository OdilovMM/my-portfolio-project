const sellerController = require("../../controllers/dashboard/sellerController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/get-seller-req", authMiddleware, sellerController.getSellerRequest);
router.get("/get-active-seller", authMiddleware, sellerController.getActiveSellers);
router.get("/get-deactive-seller", authMiddleware, sellerController.getDeactiveSellers);
router.get("/get-seller-detail/:sellerId", authMiddleware, sellerController.getSellerDetail);
router.post("/update-seller-status", authMiddleware, sellerController.updateSellerStatus);


module.exports = router;
