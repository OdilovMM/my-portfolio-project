const productController = require("../../controllers/dashboard/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);
router.get("/get-products", authMiddleware, productController.getProducts);
router.get("/get-product/:productId", authMiddleware, productController.getProduct);
router.patch("/update-product", authMiddleware, productController.updateProduct);
router.patch("/update-product-image", authMiddleware, productController.updateProductImage);

module.exports = router;
