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

const getPaymentStatus = async(req, res) => {
    try {
        const orderId = req.params.orderId;
        console.log("Fetching status for orderId:", orderId);
    
        // Populate product details in the order
        const paymentStatus = await Payment.findOne({ orderId });
        // .populate("products.product");
        console.log("Payment status : ", paymentStatus);
    
        res.status(200).json({ paymentStatus });
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
}
exports.getPaymentStatus = getPaymentStatus;