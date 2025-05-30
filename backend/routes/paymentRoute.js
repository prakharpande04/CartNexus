const crypto = require("crypto");
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/api/cashfree/session", paymentController.getSessionId);
router.post("/api/cashfree/verify", paymentController.verifyPayment);

module.exports = router;