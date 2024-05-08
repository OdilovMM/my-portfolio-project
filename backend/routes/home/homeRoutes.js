const homeController = require("../../controllers/home/homeController");

const router = require("express").Router();

router.get("/get-categories", homeController.getAllCategories);
router.get("/get-products", homeController.getProducts);
router.get("/get-products-price-range", homeController.getProductsByPriceRange);
router.get("/product-query", homeController.getProductQuery);
router.get("/get-product/:slug", homeController.getProduct);
router.post("/add-customer-product-review", homeController.addProductReview);

module.exports = router;
