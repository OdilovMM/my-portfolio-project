const customerController = require("../../controllers/home/customerController");

const router = require("express").Router();

router.post("/register-customer", customerController.customerRegister);
router.post("/login-customer", customerController.customerLogin);


module.exports = router;
