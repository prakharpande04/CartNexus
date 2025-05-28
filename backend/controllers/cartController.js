const Cart = require('../models/Cart');
const Product = require('../models/Product'); 

const addToCart = async (req, res) => {
  const { userId, productId, quantity, name, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, quantity, price }); // ✅ no need for new CartItem
    }

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCart = async (req, res) => {
  const { userId } = req.params;
  console.log('Fetching cart for user:', userId);

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    console.log('Cart fetched:', cart);

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { addToCart, getCart };
