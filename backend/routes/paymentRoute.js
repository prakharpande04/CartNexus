const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/api/cashfree/session", paymentController.getSessionId);
router.get("/api/cashfree/verify/:orderId", paymentController.verifyPayment);

module.exports = router;