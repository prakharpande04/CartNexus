const crypto = require("crypto");
const { Cashfree, CFEnvironment } = require("cashfree-pg");
const Payment = require('./../models/Payment');


const cashfree = new Cashfree(
	CFEnvironment.PRODUCTION,
	process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY
);
// ✅ Correct way to use Cashfree.PG.Orders
const generateOrderId = () => {
    const uniqueId = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHash("sha256").update(uniqueId).digest("hex");
    return `order_${hash}`;

};

const getSessionId = async(req, res) => {
    const orderId = generateOrderId();
    const customer_id = req.params.userId.replace('|', '_');
    const rawamount = req.params.total;
    const amount = parseFloat(rawamount).toFixed(2);
	const request = {
		order_amount: "1",              //amount,
		order_currency: "INR",
		customer_details: {
			customer_id: customer_id,
			customer_name: req.params.userName,
			customer_email: req.params.userEmail,
            customer_phone: "8275711340", // Placeholder, replace with actual phone number if available
		},
		order_meta: {
			return_url:
				"https://shopnexus04.vercel.app/payment-status?order_id={order_id}",
            notify_url:
                "https://cartnexus-backend.onrender.com/api/paymentStatus"
		},
		order_note: "",
	};
    console.log("Setting up order request:", request);

    cashfree
		.PGCreateOrder(request)
		.then((response) => {
			const a = response.data;
			console.log(a);
            return res.status(200).json(a);

		})
		.catch((error) => {
			console.error("Error setting up order request:", error.response.data);
		});
}
exports.getSessionId = getSessionId;

const verifyPayment = (req, res) => {
    const { orderId } = req.params;
    console.log("Verifying payment for order ID:", orderId);

    cashfree.PGOrderFetchPayments(orderId)
        .then((response) => {
            console.log("Payment verification response:", response.data);
            return res.status(200).json({
                success: true,
                message: "Payment verified successfully",
                orderId: orderId,
                paymentDetails: response.data
            });
        })
        .catch((error) => {
            console.error("Error verifying payment:", error.response.data);
            return res.status(500).json({
                success: false,
                message: "Payment verification failed",
                error: error.response.data
            });
        });
}
exports.verifyPayment = verifyPayment;

const setPaymentStatus = async (req, res) => {
    try{
        const { order_id } = req.body.data.order;
        const { bank_reference, payment_status, payment_group } = req.body.data.payment;
        console.log("Payment Status Status : ", req.body);

        const newStatus = new Payment({
            orderId : order_id,
            referenceId : bank_reference,
            transactionStatus : payment_status,
            paymentMode : payment_group
        });

        await newStatus.save();

        return res.status(200).json({ message: "Payment status recorded successfully." });
        
    } catch (error) {
        console.error("Error saving payment status:", error);
        return res.status(500).json({ message: "Failed to record payment status." });
    }
}
exports.setPaymentStatus = setPaymentStatus;


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getPaymentStatus = async (req, res) => {
  const orderId = req.params.orderId;
  console.log("Fetching status for orderId:", orderId);

  const maxRetries = 5;
  const retryDelay = 1000; // 1 second
  let attempt = 0;
  let paymentStatus = null;

  while (attempt < maxRetries) {
    try {
      paymentStatus = await Payment.findOne({ orderId });

      if (paymentStatus) {
        console.log("Payment status found:", paymentStatus);
        return res.status(200).json({ paymentStatus });
      }

      console.log(`Attempt ${attempt + 1}: Payment status not found. Retrying...`);
      attempt++;
      await delay(retryDelay);
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      attempt++;
      await delay(retryDelay);
    }
  }

  console.error("Payment status not found after retries.");
  return res.status(404).json({ success: false, message: "Payment status not found." });
};

exports.getPaymentStatus = getPaymentStatus;
