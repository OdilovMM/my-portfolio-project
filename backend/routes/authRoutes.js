const authController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/admin-login", authController.adminLogin);
router.get("/get-user-detail", authMiddleware, authController.getUser);
router.patch("/upload-profile-image", authMiddleware, authController.uploadProfileImage);
router.post("/seller-register", authController.sellerRegister);
router.post("/seller-login", authController.sellerLogin);
router.post("/add-profile-address",authMiddleware, authController.addProfileAddress);

module.exports = router;
