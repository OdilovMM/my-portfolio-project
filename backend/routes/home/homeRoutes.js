const homeController = require("../../controllers/home/homeController");

const router = require("express").Router();

router.get("/get-categories", homeController.getAllCategories);
router.get("/get-products", homeController.getProducts);
router.get("/get-products-price-range", homeController.getProductsByPriceRange);
router.get("/product-query", homeController.getProductQuery);

module.exports = router;
