const authController = require("../middlewares/authController");

const router = require("express").Router();

router.post("/admin-login", authController.admin_login);

module.exports = router;
