const homeController = require("../../controllers/home/homeController");

const router = require("express").Router();

router.get("/get-categories", homeController.getAllCategories);

module.exports = router;
