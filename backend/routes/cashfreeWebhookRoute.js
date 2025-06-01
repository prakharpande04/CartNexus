const express = require('express');
const router = express.Router();
const { handleCashfreeWebhook } = require('../controllers/cashfreeWebhookController');

// Webhook POST endpoint
router.post('/api/webhook/cashfree', handleCashfreeWebhook);
router.get('/api/webhook/cashfree', (req, res) => {
  res.status(200).send('Cashfree webhook endpoint is active');
});

module.exports = router;
