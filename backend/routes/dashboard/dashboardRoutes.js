const dashboardController = require("../../controllers/dashboard/dashboardController.js");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const router = require("express").Router();

router.get("/get-admin-dashboard-info", authMiddleware, dashboardController.getAdminDashboardInfo);

module.exports = router;
