const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);
router.get("/get-products", authMiddleware, productController.getProducts);
router.get(
  "/get-product/:productId",
  authMiddleware,
  productController.getProduct
);
router.patch(
  "/update-product",
  authMiddleware,
  productController.updateProduct
);
router.patch(
  "/update-product-image",
  authMiddleware,
  productController.updateProductImage
);
router.post("/add-banner", authMiddleware, productController.addBanner);
router.get(
  "/get-banner/:productId",
  authMiddleware,
  productController.getBanner
);
router.patch(
  "/update-banner/:bannerId",
  authMiddleware,
  productController.updateBanner
);
router.get("/get-all-banners", productController.getAllBanners);

module.exports = router;
