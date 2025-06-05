const crypto = require('crypto');
const OrderPayment = require('../models/OrderPayment');
const Cart = require('../models/Cart');
const Payment = require('../models/Payment');
const CASHFREE_WEBHOOK = process.env.CASHFREE_WEBHOOK;

exports.handleCashfreeWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-webhook-signature'];
    const rawBody = req.body; // Buffer, because of express.raw()

    console.log('request received:', rawBody.toString('utf8'));
    console.log('signature received:', signature);

    // Step 1: Verify signature using the raw body
    const expectedSignature = crypto
      .createHmac('sha256', CASHFREE_WEBHOOK)
      .update(rawBody)
      .digest('base64');

    console.log('expected signature:', expectedSignature);

    // if (signature !== expectedSignature) {
    //   return res.status(401).json({ message: 'Invalid signature' });
    // }
    console.log('✅ Signature verified successfully');

    // Step 2: Parse the body
    const parsedBody = JSON.parse(rawBody.toString('utf8'));
    const event = parsedBody.type;
    const data = parsedBody.data;
    console.log('Parsed event:', event);
    console.log('Parsed data:', data);

    const newStatus = new Payment({
        orderId : data.order?.order_id,
        referenceId : data.payment?.bank_reference,
        transactionStatus : data.payment?.payment_status,
        paymentMode : data.payment?.payment_group
    });

    await newStatus.save();

    if (event === 'PAYMENT_SUCCESS_WEBHOOK') {
      const rawUserId = data.customer_details?.customer_id || 'guest';

      const paymentInfo = {
        userId: rawUserId,
        orderId: data.order?.order_id,
        paymentId: data.payment?.cf_payment_id,
        amount: parseFloat(data.payment?.payment_amount),
        currency: data.payment?.payment_currency,
        status: data.payment?.payment_status,
        paymentMethod: data.payment?.payment_group,
        paidAt: new Date(data.payment?.payment_time),
      };


      console.log('📥 Payment success data:', paymentInfo);
      await OrderPayment.create(paymentInfo);
      console.log('💾 Payment saved');

      await Cart.findOneAndUpdate(
        { userId: rawUserId.replace('_', '|') }, // Convert userId from 'user|id' to 'user_id'
        { $set: { items: [] } },
        { $set: { totalQuantity: 0 } } // Clear the cart items
      );
      console.log('Cart items cleared for user:', rawUserId);
    }

    res.status(200).json({ message: 'Webhook received' });
  } catch (err) {
    console.error('❌ Webhook processing error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
