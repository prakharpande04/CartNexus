import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import {
  CheckCircleIcon,
  HomeIcon,
  CubeIcon,
  CalendarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { getCookie } from '../utils/cookie';
import {useCart} from '../context/CartContext';

const PaymentSuccess = () => {

  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [orderAmount, setOrderAmount] = useState(0);
  const [expectedDelivery, setExpectedDelivery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = getCookie('userId');
  const { cartCount, setCartCount } = useCart();


  useEffect(() => {
    const orderId = searchParams.get("orderId");
    setOrderId(orderId || "Unavailable");

    if (orderId) {
      console.log("Fetching order details for orderId:", orderId, "and userId:", userId);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/orderById/${userId}/${orderId}`)
        .then((res) => {
          const order = res.data.order;
          console.log("Order details fetched:", res.data);
          setOrderItems(order.products || []);
          setExpectedDelivery(order.expectedDelivery?.split("T")[0] || "");
          setOrderAmount(order.totalAmount || 0);
          setCartCount(0);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch order details:", err);
          setError("Failed to load order details.");
          setLoading(false);
        })
    }
  }, []);

  return (
    loading ? <Loader /> :
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl text-center animate-fade-in-down">
        <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-extrabold text-green-700 mb-2">Payment Successful</h1>
        <p className="text-gray-600 mb-6">Your order has been placed successfully. Thank you for shopping with us!</p>

        <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-left mb-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-green-700 flex items-center mb-2">
              <CubeIcon className="h-5 w-5 mr-2" />
              Order Details
            </h2>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Order Amount:</span> ₹{orderAmount.toFixed(2)}
            </p>
            {expectedDelivery && (
              <p className="text-sm text-gray-700 flex items-center mt-1">
                <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                Expected Delivery: <strong className="ml-1">{expectedDelivery}</strong>
              </p>
            )}
          </div>

          <div>
            <h3 className="text-md font-semibold text-green-700 flex items-center mb-3">
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Items in Your Order
            </h3>
            <ul className="divide-y divide-gray-200">
              {orderItems.map((item, index) => (
                <li key={index} className="py-2 flex justify-between text-sm text-gray-700">
                  <span>{item.product.name} × {item.quantity}</span>
                  <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-semibold text-gray-800">
              <span>Total</span>
              <span>₹{orderAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200"
        >
          <HomeIcon className="h-5 w-5" />
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
