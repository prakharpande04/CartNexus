const crypto = require("crypto");
const { Cashfree, CFEnvironment } = require("cashfree-pg");


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
		order_amount: amount,
		order_currency: "INR",
		customer_details: {
			customer_id: customer_id,
			customer_name: req.params.userName,
			customer_email: req.params.userEmail,
            customer_phone: "8275711340", // Placeholder, replace with actual phone number if available
		},
		order_meta: {
			return_url:
				`https://shop-nexus.vercel.app/payment-success?order_id=${orderId}`,
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