const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      orderId,
      userId,
      products,           // Should be an array of { product: ObjectId, quantity: Number }
      totalAmount,
      paymentStatus = "Completed",
      expectedDelivery,
    } = req.body;
    const id = userId.replace('|', '_');

    if (!orderId || !id || !products || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Optional: Validate products array is not empty
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one product" });
    }

    const newOrder = new Order({
      orderId,
      userId : id, // Store userId in the format with underscore
      products,
      totalAmount,
      paymentStatus,
      expectedDelivery,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get a specific order by orderId
exports.getOrders = async (req, res) => {
  try {
    const userId = req.params.userId.replace('|', '_'); // Convert userId from 'user|id' to 'user_id'
    console.log("Fetching orders for userId:", userId);

    // Populate product details in the order
    const orders = await Order.find({ userId }).populate("products.product");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }
    orders.forEach(order => {
      order.userId = order.userId.replace('_', '|'); // Convert userId back to original format for response
    });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const userId = req.params.userId.replace('|', '_'); // Convert userId from 'user|id' to 'user_id'
    const orderId = req.params.orderId; // Assuming orderId is passed as a parameter
    console.log("Fetching order for userId:", userId, "and orderId:", orderId);

    // Find the order by userId and orderId
    const order = await Order.findOne({ userId, orderId }).populate("products.product");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Convert userId back to original format for the response
    order.userId = order.userId.replace('_', '|');

    console.log("Order found:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};