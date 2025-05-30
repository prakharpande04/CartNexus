// src/pages/PaymentSuccess.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const orderId = searchParams.get("orderId");
    setOrderId(orderId);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center px-4">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Payment Status</h1>
      <p className="text-lg text-gray-700">Payment Successful!</p>
      {orderId && (
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-medium">{orderId}</span>
        </p>
      )}
    </div>
  );
};

export default PaymentSuccess;
