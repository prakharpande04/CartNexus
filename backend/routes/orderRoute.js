const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/api/order/save', orderController.saveOrder);

module.exports = router;