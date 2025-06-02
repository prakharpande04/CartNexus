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

    if (!orderId || !userId || !products || !totalAmount) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Optional: Validate products array is not empty
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Order must contain at least one product" });
    }

    userId = userId.replace('|', '_');
    const newOrder = new Order({
      orderId,
      userId,
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
    const { userId } = req.params;
    userId = userId.replace('|', '_');

    // Populate product details in the order
    const orders = await Order.find({ userId }).populate("products.product");

    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    userId = userId.replace('|', '_');
    console.log("Fetching order for userId:", userId, "and orderId:", orderId);

    // Find the order by userId and orderId
    const order = await Order.findOne({ userId, orderId }).populate("products.product");

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }
    console.log("Order found:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
}