const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/api/cashfree/session/:userId/:userName/:userEmail/:total", paymentController.getSessionId);
router.get("/api/cashfree/verify/:orderId", paymentController.verifyPayment);
router.get("/api/getPaymentStatus/:orderId", paymentController.getPaymentStatus);

module.exports = router;