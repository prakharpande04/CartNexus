const crypto = require('crypto');
const OrderPayment = require('../models/OrderPayment');

// Secret from environment
const CASHFREE_WEBHOOK = process.env.CASHFREE_WEBHOOK;

exports.handleCashfreeWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const body = req.body;
    console.log('request received:', body);
    console.log('signature received:', signature);

    // Step 1: Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', CASHFREE_WEBHOOK)
      .update(body)
      .digest('base64');
    console.log('expected signature:', expectedSignature);

    if (signature !== expectedSignature) {
      return res.status(401).json({ message: 'Invalid signature' });
    }
    console.log('Signature verified successfully');

    const parsedBody = JSON.parse(body);
    const event = parsedBody.event;
    const data = parsedBody.data;

    if (event === 'PAYMENT_SUCCESS_WEBHOOK') {
      const paymentInfo = {
        userId: data.customer_details.customer_id || 'guest',
        orderId: data.order.order_id,
        paymentId: data.payment.payment_id,
        amount: parseFloat(data.payment.amount),
        currency: data.payment.currency,
        status: data.payment.payment_status,
        paymentMethod: data.payment.payment_method,
        paidAt: new Date(data.payment.payment_time),
      };
      console.log('Payment success data:', paymentInfo);

      await OrderPayment.create(paymentInfo);
      console.log('Payment saved:', paymentInfo);
    }
    console.log('Webhook event processed:', event);

    res.status(200).json({ message: 'Webhook received' });
  } catch (err) {
    console.error('Webhook processing error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
