const express = require('express');
const router = express.Router();
const { handleCashfreeWebhook } = require('../controllers/cashfreeWebhookController');

// Webhook POST endpoint
router.post('/api/webhook/cashfree', handleCashfreeWebhook);

module.exports = router;
