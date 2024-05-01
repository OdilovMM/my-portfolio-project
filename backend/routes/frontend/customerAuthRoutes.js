const customerController = require("../../controllers/home/customerController");

const router = require("express").Router();

router.post("/register-customer", customerController.customerRegister);

module.exports = router;
