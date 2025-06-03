import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getCookie } from "../utils/cookie"
import axios from "axios"
import { load } from "@cashfreepayments/cashfree-js"
import { useAuth0 } from "@auth0/auth0-react"

function Checkout() {
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [orderId, setOrderId] = useState("")
  const [paymentStep, setPaymentStep] = useState("review") // review, processing, success
  const navigate = useNavigate()
  const { user } = useAuth0()
  const userId = user?.sub || getCookie("userId")
  const cashfree = useRef(null)

  const subtotal = cartItems.reduce((total, item) => total + (item.price ?? 0) * (item.quantity ?? 0), 0)
  const shipping = 40
  const tax = subtotal * 0.18
  const total = subtotal + shipping + tax

  const getSessionId = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/cashfree/session/${userId}/${user?.name}/${user?.email}/${total}`,
      )
      const { order_id, payment_session_id } = res.data
      console.log("Cashfree session ID:", res.data.order_id)

      setOrderId(order_id)
      return { orderId: order_id, sessionId: payment_session_id }
    } catch (error) {
      console.error("Error fetching Cashfree session ID:", error)
      throw error
    }
  }

  useEffect(() => {
    console.log("Order ID set in state:", orderId)
  }, [orderId])

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        cashfree.current = await load({
          mode: "production", // or 'TEST' for testing environment
        })
        console.log("Cashfree SDK initialized successfully")
      } catch (error) {
        console.error("Error initializing Cashfree SDK:", error)
        throw error
      }
    }
    initializeSDK()
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`)
        const cart = res.data
        console.log("cart items in checkout", res.data)

        if (!cart || !cart.items) {
          setCartItems([])
          return
        }

        const allItems = cart.items.map((item) => {
          console.log("item : ", item)
          const product = item.productId || {}
          console.log("product : ", product)

          return {
            id: product, // Ensure this gets the actual product _id
            name: item.name,
            price: item.price,
            quantity: item.quantity ?? 1,
            image: product.image || "",
          }
        })

        setCartItems(allItems)
      } catch (err) {
        console.error("Error fetching cart items:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [userId])

  useEffect(() => {
    console.log("All items (after update):", cartItems)
  }, [cartItems])

  const verifyPayment = async (orderId) => {
    console.log("Verifying payment for order ID:", orderId)

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cashfree/verify/${orderId}`)
      console.log("Payment verification response:", res.data.message)

      const orderData = {
        orderId,
        userId, // string user ID
        products: cartItems.map((item) => ({
          product: item.id, // ✅ include product ID
          name: item.name,
          quantity: item.quantity,
        })),
        totalAmount: total,
        paymentStatus: "Successful",
      }

      // Send order data to backend
      console.log("Sending create order data to backend:", orderData)
      const sentOrder = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/order/create`, orderData)
      console.log("Order created successfully:", sentOrder)
      console.log("Navigating to payment success page with order ID:", orderId)
      setLoading(false)
      navigate(`/payment-success?orderId=${orderId}`)
    } catch (error) {
      console.error("Error verifying payment:", error)
    }
  }

  const handlePayment = async (e) => {
    try {
      setProcessing(true)
      setPaymentStep("processing")
      const { orderId, sessionId } = await getSessionId()
      console.log("Session ID:", sessionId, "for order ID:", orderId)

      const checkoutOptions = {
        orderId: orderId,
        paymentSessionId: sessionId,
        redirectTarget: "_modal", // or '_blank' for new tab
      }

      console.log("payment for orderId:", orderId)
      if (cashfree.current) {
        cashfree.current
          .checkout(checkoutOptions)
          .then((response) => {
            console.log("Cashfree checkout response:", response)
            // Use the orderId from the state at the time of session creation
            verifyPayment(orderId)
          })
          .catch((error) => {
            console.error("Cashfree checkout error:", error)
            setProcessing(false)
            setPaymentStep("review")
          })
      } else {
        console.error("Cashfree SDK has not been initialized.")
        setProcessing(false)
        setPaymentStep("review")
      }
    } catch (err) {
      console.error("Payment initialization failed", err)
      setProcessing(false)
      setPaymentStep("review")
    }
  }

  const goToCart = () => {
    navigate("/cart")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading checkout...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
            Secure Checkout
          </h1>
          <p className="text-gray-400 text-lg">Review your order and complete your purchase</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentStep === "review" || paymentStep === "processing"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : "bg-white/20 text-gray-400"
                  }`}
                >
                  <span className="font-bold">1</span>
                </div>
                <span className="text-white font-medium">Review Order</span>
              </div>
              <div className="flex-1 h-1 bg-white/20 mx-4 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 ${
                    paymentStep === "processing" ? "w-1/2" : paymentStep === "success" ? "w-full" : "w-0"
                  }`}
                ></div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    paymentStep === "processing"
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                      : paymentStep === "success"
                        ? "bg-green-500 text-white"
                        : "bg-white/20 text-gray-400"
                  }`}
                >
                  {paymentStep === "processing" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <span className="font-bold">2</span>
                  )}
                </div>
                <span className="text-white font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-12 max-w-2xl mx-auto text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">No items to checkout</h2>
            <p className="text-gray-400 mb-8">Please add items to your cart before proceeding to checkout.</p>
            <button
              onClick={goToCart}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go to Cart
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    Order Items
                  </h2>
                  <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                  </div>
                </div>

                <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg
                              className="w-10 h-10 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{item.name}</h3>
                          <p className="text-gray-400 text-sm">Unit Price: ₹{item.price.toFixed(2)}</p>
                          <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <p className="text-gray-400 text-xs">Item Total</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button
                    onClick={goToCart}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                      />
                    </svg>
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Shipping</span>
                    <span className="font-medium">₹{shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Tax (18%)</span>
                    <span className="font-medium">₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-white/10 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-white">Total</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                        Proceed to Payment
                      </>
                    )}
                  </button>
                </div>

                {/* Security Features */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="text-sm text-gray-300">256-bit SSL Encryption</span>
                  </div>

                  <div className="flex items-center justify-center gap-2 bg-white/5 rounded-lg p-3 border border-white/10">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span className="text-sm text-gray-300">Secure Payment Gateway</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6">
                  <p className="text-sm text-gray-400 text-center mb-3">Accepted Payment Methods</p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">MC</span>
                    </div>
                    <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AMEX</span>
                    </div>
                    <div className="w-12 h-8 bg-white/20 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">UPI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #2563eb);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

export default Checkout


// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getCookie } from '../utils/cookie';
// import axios from 'axios';
// import Loader from '../components/Loader';
// import {load} from '@cashfreepayments/cashfree-js';
// import {useAuth0} from '@auth0/auth0-react'; 


// function Checkout() {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const { user } = useAuth0();
//   const userId = user?.sub || getCookie('userId');
//   const [cartItems, setCartItems] = useState([]);
//   const [orderId, setOrderId] = useState('');
//   const cashfree = useRef(null);

//   const getSessionId = async() => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cashfree/session/${userId}/${user?.name}/${user?.email}/${total}`);
//       const { order_id, payment_session_id } = res.data;
//       console.log('Cashfree session ID:', res.data.order_id);

//       setOrderId(order_id);

//       return { orderId: order_id, sessionId: payment_session_id };
//     } catch (error) {
//       console.error('Error fetching Cashfree session ID:', error);
//       throw error;
//     }
//   };
//   useEffect(() => {
//     console.log('Order ID set in state:', orderId);
//   },
//   [orderId]);

//   const subtotal = cartItems.reduce(
//     (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
//     0
//   );
//   const shipping = 10;
//   const tax = subtotal * 0.18;
//   const total = subtotal + shipping + tax;

//   useEffect(() => {
//     const initializeSDK = async() => {
//     try {
//       cashfree.current = await load({
//         mode: 'production', // or 'TEST' for testing environment
//       });
//       console.log('Cashfree SDK initialized successfully');
//     } catch (error) {
//       console.error('Error initializing Cashfree SDK:', error);
//       throw error;
//     }
//   };
//   initializeSDK();
//   }, []);

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cart/${userId}`);
//         const cart = res.data;
//         console.log("cart items in checkout", res.data);

//         if (!cart || !cart.items) {
//           setCartItems([]);
//           return;
//         }

//         const allItems = cart.items.map((item) => {
//           console.log("item : ",item)
//           const product = item.productId || {};
//           console.log("product : ",product);

//           return {
//             id: product,  // Ensure this gets the actual product _id
//             name: item.name,
//             price: item.price,
//             quantity: item.quantity ?? 1,
//             image: product.image || '',
//           };
//         });

//         setCartItems(allItems);
//       } catch (err) {
//         console.error('Error fetching cart items:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartItems();
//   },
//   []);

//   useEffect(() => {
//     console.log("All items (after update):", cartItems);
//   }, [cartItems]);

//   const verifyPayment = async(orderId) => {
//     console.log('Verifying payment for order ID:', orderId);

//     try {

//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/cashfree/verify/${orderId}`);
//       console.log('Payment verification response:', res.data.message);

//       const orderData = {
//         orderId,
//         userId, // string user ID
//         products: cartItems.map(item => ({
//           product: item.id, // ✅ include product ID
//           name: item.name,
//           quantity: item.quantity,
//         })),
//         totalAmount: total,
//         paymentStatus: "Successful",
//       };

//     // Send order data to backend
//       console.log('Sending create order data to backend:', orderData);
//       const sentOrder = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/order/create`, orderData);
//       console.log('Order created successfully:', sentOrder);
//       console.log('Navigating to payment success page with order ID:', orderId);
//       setLoading(false);
//       navigate(`/payment-success?orderId=${orderId}`);
//     } catch (error) {
//       console.error('Error verifying payment:', error); 
//     }
//   };

//   const handlePayment = async(e) => {
//     try {
//       setLoading(true);
//       const { orderId, sessionId } = await getSessionId();
//       console.log('Session ID:', sessionId, 'for order ID:', orderId);

//       const checkoutOptions = {
//         orderId: orderId,
//         paymentSessionId: sessionId,
//         redirectTarget: '_modal', // or '_blank' for new tab
//       }

//       console.log("payment for orderId:", orderId);
//       if (cashfree.current) {
//         cashfree.current.checkout(checkoutOptions)
//         .then((response) => {
//           console.log('Cashfree checkout response:', response);
//           // Use the orderId from the state at the time of session creation
//           verifyPayment(orderId); 
//         })
//         .catch((error) => {
//           console.error('Cashfree checkout error:', error);
//         });
//       } else {
//         console.error("Cashfree SDK has not been initialized.");
//       }
//     } catch (err) {
//       console.error('Payment initialization failed', err);
//     }
//   };

//   const goToCart = () => {
//     navigate('/cart');
//   };

//   return loading ? (
//     <Loader />
//   ) : (
//     <div className="min-h-screen min-w-screen bg-gray-50 py-10 px-4 sm:px-8">
//       <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
//         <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">🧾 Checkout</h1>

//         {cartItems.length === 0 ? (
//           <div className="text-center py-20">
//             <h2 className="text-2xl font-semibold text-gray-700">No items in cart</h2>
//             <p className="text-gray-500 mt-2">Please add items to cart before checking out.</p>
//             <button
//               onClick={goToCart}
//               className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
//             >
//               Go to Cart
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {/* Cart Items Summary */}
//             <div className="lg:col-span-2 space-y-6">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col sm:flex-row items-center justify-between gap-6 border p-4 rounded-xl shadow-sm bg-white"
//                 >
//                   <div className="flex items-center gap-5">
//                     {item.image ? (
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded-xl border"
//                       />
//                     ) : (
//                       <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded-xl text-gray-500">
//                         No Image
//                       </div>
//                     )}
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//                       <p className="text-sm text-gray-500">₹{item.price.toFixed(2)}</p>
//                     </div>
//                   </div>
//                   <div className="text-lg text-gray-700">Qty: {item.quantity}</div>
//                   <div className="text-lg font-semibold text-gray-900">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Summary Section */}
//             <div className="bg-gray-100 p-6 rounded-2xl shadow-inner">
//               <h2 className="text-2xl font-bold mb-4 text-gray-800">Order Summary</h2>
//               <div className="space-y-4 text-gray-600 text-base">
//                 <div className="flex justify-between">
//                   <span>Subtotal</span>
//                   <span>₹{subtotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>₹{shipping.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Tax (18%)</span>
//                   <span>₹{tax.toFixed(2)}</span>
//                 </div>
//                 <div className="border-t pt-4 mt-4 flex justify-between text-xl font-semibold text-gray-900">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button
//                 onClick={handlePayment}
//                 className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition font-medium text-lg"
//               >
//                 Proceed to Payment
//               </button>
//               <button
//                 onClick={goToCart}
//                 className="mt-3 w-full text-blue-600 hover:text-blue-800 text-sm underline"
//               >
//                 Back to Cart
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Checkout;