const Order = require('../models/Order');

const saveOrder = async (req, res) => {
  try {
    const { userId, amount, currency, paymentId, orderId, status, paymentMethod } = req.body;

    const order = new Order({
      userId,
      amount,
      currency,
      paymentId,
      orderId,
      status,
      paymentMethod,
    });

    await order.save();
    res.status(201).json({ message: 'Order recorded successfully', order });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to record order' });
  }
};

module.exports = { saveOrder };