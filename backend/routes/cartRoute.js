const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/api/cart/:userId', cartController.getCart);
router.post('/api/cart', cartController.addToCart);

module.exports = router;