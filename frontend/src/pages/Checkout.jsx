import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../utils/cookie';
import axios from 'axios';
import Loader from '../components/Loader';
import {load} from '@cashfreepayments/cashfree-js';

function Checkout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = getCookie('userId');
  const [cartItems, setCartItems] = useState([]);
  const [orderId, setOrderId] = useState('');
  const cashfree = useRef(null);

  const getSessionId = async() => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cashfree/session`);
      const { order_id, payment_session_id } = res.data;
      console.log('Cashfree session ID:', res.data.order_id);

      setOrderId(order_id);
      console.log('Order ID set in state:', orderId);

      return { orderId: order_id, sessionId: payment_session_id };
    } catch (error) {
      console.error('Error fetching Cashfree session ID:', error);
      throw error;
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    const initializeSDK = async() => {
    try {
      cashfree.current = await load({
        mode: 'production', // or 'TEST' for testing environment
      });
      console.log('Cashfree SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Cashfree SDK:', error);
      throw error;
    }
  };
  initializeSDK();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`);
        const cart = res.data;

        if (!cart || !cart.items) {
          setCartItems([]);
          return;
        }

        const allItems = cart.items.map((item) => {
          const product = item.productId || {};
          return {
            id: item._id || product._id,
            name: item.name || product.name || 'Unnamed product',
            price: item.price ?? product.price ?? 0,
            quantity: item.quantity ?? 1,
            image: product.image || '',
          };
        });

        setCartItems(allItems);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const verifyPayment = async(orderId) => {
    console.log('Verifying payment for order ID:', orderId);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cashfree/verify/${orderId}`);
      console.log('Payment verification response:', res.data.message);
      navigate('/payment-success', { state: { orderId } });

    } catch (error) {
      console.error('Error verifying payment:', error); 
    }
  };

  const handlePayment = async(e) => {
    try {
      const { orderId, sessionId } = await getSessionId();
      console.log('Session ID:', sessionId, 'for order ID:', orderId);

      const checkoutOptions = {
        orderId: orderId,
        paymentSessionId: sessionId,
        redirectTarget: '_modal', // or '_blank' for new tab
      }

      console.log("payment for orderId:", orderId);
      if (cashfree.current) {
        cashfree.current.checkout(checkoutOptions)
        .then((response) => {
          console.log('Cashfree checkout response:', response);
          // Use the orderId from the state at the time of session creation
          verifyPayment(orderId); 
        })
        .catch((error) => {
          console.error('Cashfree checkout error:', error);
        });
      } else {
        console.error("Cashfree SDK has not been initialized.");
      }
    } catch (err) {
      console.error('Payment initialization failed', err);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="min-h-screen min-w-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🧾 Checkout</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-700">No items in cart</h2>
            <p className="text-gray-500 mt-2">Please add items to cart before checking out.</p>
            <button
              onClick={goToCart}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Go to Cart
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Cart Items Summary */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between gap-6 border p-4 rounded-xl shadow-sm bg-white"
                >
                  <div className="flex items-center gap-5">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border"
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
                        No Image
                      </div>
                    )}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-lg text-gray-700">Qty: {item.quantity}</div>
                  <div className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Section */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
              <div className="space-y-4 text-gray-600 text-base">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (18%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition font-medium text-lg"
              >
                Proceed to Payment
              </button>
              <button
                onClick={goToCart}
                className="mt-3 w-full text-blue-600 hover:text-blue-800 text-sm underline"
              >
                Back to Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
