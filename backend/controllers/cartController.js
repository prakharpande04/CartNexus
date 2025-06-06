const Cart = require('../models/Cart');
const Product = require('../models/Product'); 

const addToCart = async (req, res) => {
  console.log('Adding to cart:', req.body);
  const { userId } = req.body;
  const { productId, name, price } = req.body.product;
  const quantity = 1; // Default to 1 if not provided
  console.log("At backednd to cart : ",productId);

  try {
    let cart = await Cart.findOne({ userId });
    console.log("to find : ",cart);

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
 
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    console.log("existing item : ", existingItem);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, name, quantity, price }); // ✅ no need for new CartItem
    }
    console.log("added !!");

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();
    console.log("CP1");
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
    const cart = await Cart.findOne({ userId });
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

const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  console.log(`Removing product ${productId} from cart for user ${userId}`);

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const clearCart = async(req, res) => {
  const {userId} = req.params;

  try{
    const cart = await Cart.findOne({ userId });
    cart.items = [];
    cart.totalQuantity = 0;
    cart.totalPrice = 0;
    await cart.save();
    return res.status(200).json({message : 'Cart cleared'});
  }
  catch{
    return res.status(404).json({ message: 'Cart not cleared' });
  }
};

const updateCartItem = async (req, res) => {
  const { userId, productId, newQuantity } = req.params;
  console.log(`Updating product ${productId} in cart for user ${userId} with quantity ${newQuantity}`);

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = newQuantity;

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCount = async (req, res) => {
    try {
        const userId = req.params.userId;

        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        // count the number of products in cart
        const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        console.log("Cart count for user:", userId, "is", count);

        return res.status(200).json({ count });
    } catch (error) {
        console.error("Error fetching cart count:", error);
        return res.status(500).json({ message: "An error occurred" });
    }
};

module.exports = { addToCart, getCart, removeFromCart, updateCartItem, clearCart, getCount };
