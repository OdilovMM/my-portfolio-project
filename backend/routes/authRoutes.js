const authController = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.post("/admin-login", authController.adminLogin);
router.get("/get-user-detail", authMiddleware, authController.getUser);
// router.get("/get-admin-detail", authMiddleware, authController.getAdminDetail);
router.patch("/upload-profile-image", authMiddleware, authController.uploadProfileImage);
router.post("/seller-register", authController.sellerRegister);
router.post("/seller-login", authController.sellerLogin);
router.post("/add-profile-address",authMiddleware, authController.addProfileAddress);
router.get("/logout",authMiddleware, authController.logout);

module.exports = router;
