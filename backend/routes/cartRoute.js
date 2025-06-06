const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/api/cart/:userId', cartController.getCart);
router.post('/api/cart', cartController.addToCart);
router.delete('/api/cart/:userId/:productId', cartController.removeFromCart);
router.put('/api/cart/:userId/:productId/:newQuantity', cartController.updateCartItem);
router.get('/api/cart/clear/:userId', cartController.clearCart);
router.get("/api/cart/cartCount/:userId", cartController.getCount);
module.exports = router;