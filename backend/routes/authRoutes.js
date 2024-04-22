const authController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/admin-login", authController.adminLogin);
router.get("/get-user", authMiddleware, authController.getUser);
router.post("/seller-register", authController.sellerRegister);
router.post("/seller-login", authController.sellerLogin);

module.exports = router;
