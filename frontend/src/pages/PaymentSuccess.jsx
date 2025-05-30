// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("Fetching payment status...");

  useEffect(() => {
    const order_id = searchParams.get("order_id");
    setOrderId(order_id);

    if (order_id) {
      // Replace with your actual backend API
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify?orderId=${order_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "PAID") {
            setStatus("Payment successful! Thank you for your order.");
          } else {
            setStatus("Payment status: " + data.status);
          }
        })
        .catch(() => {
          setStatus("Error verifying payment status.");
        });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Status</h1>
      <p className="text-lg text-gray-700">{status}</p>
      {orderId && (
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>
      )}
    </div>
  );
};

export default PaymentSuccess;
