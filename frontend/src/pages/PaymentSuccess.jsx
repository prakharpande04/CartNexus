// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full animate-fade-in-down">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-green-700 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-1">Thank you! Your transaction was completed.</p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-4">
            Order ID: <span className="font-semibold">{orderId}</span>
          </p>
        )}
        <p className="text-gray-500 text-sm">Redirecting to homepage in <span className="font-semibold">{countdown}</span> seconds...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;