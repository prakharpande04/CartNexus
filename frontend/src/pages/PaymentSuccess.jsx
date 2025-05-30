// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const orderIdFromUrl = searchParams.get("orderId");
    setOrderId(orderIdFromUrl);
  }, [searchParams]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Status</h1>
      <p className="text-lg text-gray-700">Payment Successful!</p>
      {orderId && (
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>
      )}
      <p className="mt-4 text-gray-600">Redirecting in {countdown}...</p>
    </div>
  );
};

export default PaymentSuccess;
