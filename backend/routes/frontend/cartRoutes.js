const cartController = require("../../controllers/home/cartController");

const router = require("express").Router();

router.post("/add-cart", cartController.addToCart);
router.get("/get-customer-cart/:userId", cartController.getCustomerCart);
router.delete("/remove-product-from-cart/:productId", cartController.deleteProductFromCart);
router.patch("/increment-product-of-cart/:productId", cartController.incrementProductInCart);
router.patch("/decrement-product-of-cart/:productId", cartController.decrementProductInCart);
router.post("/add-wishlist", cartController.addToWishlist);
router.get("/get-all-wishlist/:userId", cartController.getAllMyWishlist);
router.delete("/remove-wishlist/:wishlistId", cartController.deleteFromWishlist);

module.exports = router;
