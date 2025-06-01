const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/api/order/create', orderController.createOrder);
router.get('/api/order/:userId', orderController.getOrders);
router.get('/api/order/:userId/:orderId', orderController.getOrderById);

module.exports = router;