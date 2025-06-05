import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { getCookie } from "../utils/cookie"
import { useCart } from "../context/CartContext"

const PaymentStatus = () => {
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState("")
  const [orderItems, setOrderItems] = useState([])
  const [orderAmount, setOrderAmount] = useState(0)
  const [expectedDelivery, setExpectedDelivery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const navigate = useNavigate()
  const userId = getCookie("userId")
  const { cartCount, setCartCount } = useCart()
  const [referenceId, setReferenceId] = useState("")
  const [transactionStatus, setTransactionStatus] = useState("")
  const [paymentMode, setPaymentMode] = useState("")

  useEffect(() => {
  const timer = setTimeout(() => {
    console.log("3 seconds passed");
  }, 3000);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const orderId = searchParams.get("order_id")
      setOrderId(orderId || "Unavailable")

      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getPaymentStatus/${orderId}`)
        console.log("Order status in frontend:", response.data)

        setReferenceId(response.data.paymentStatus.referenceId)
        setTransactionStatus(response.data.paymentStatus.transactionStatus)
        setPaymentMode(response.data.paymentStatus.paymentMode)
      } catch (err) {
        console.error("Error fetching payment status:", err)
      }

      if (orderId) {
        console.log("Fetching order details for orderId:", orderId, "and userId:", userId)

        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orderById/${userId}/${orderId}`)
          const order = res.data.order

          console.log("Order details fetched:", order)
          setOrderItems(order.products || [])
          setExpectedDelivery(order.expectedDelivery?.split("T")[0] || "")
          setOrderAmount(order.totalAmount || 0)
          setCartCount(0)
          setLoading(false)
          setShowConfetti(true)
          setTimeout(() => setShowConfetti(false), 3000)
        } catch (err) {
          console.error("Failed to fetch order details:", err)
          setError("Failed to load order details.")
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [searchParams, userId, setCartCount])

  useEffect(() => {
    console.log("Order Items : ", orderItems)
    console.log("Amount : ", orderAmount)
  }, [orderItems, orderAmount])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "success":
      case "successful":
      case "completed":
        return "text-green-300 bg-green-500/20 border-green-500/30"
      case "pending":
      case "processing":
        return "text-yellow-300 bg-yellow-500/20 border-yellow-500/30"
      case "failed":
      case "failure":
        return "text-red-300 bg-red-500/20 border-red-500/30"
      default:
        return "text-blue-300 bg-blue-500/20 border-blue-500/30"
    }
  }

  const getPaymentModeIcon = (mode) => {
    switch (mode?.toLowerCase()) {
      case "upi":
        return "💳"
      case "card":
      case "credit_card":
      case "debit_card":
        return "💳"
      case "netbanking":
        return "🏦"
      case "wallet":
        return "👛"
      default:
        return "💰"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Processing your order...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Confetti Animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 w-full max-w-5xl">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg">🎉</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Payment Successful!
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your order has been placed successfully. Thank you for shopping with us!
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Order Summary</h2>
                  <p className="text-gray-400 text-sm">Your purchase details</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Order ID</span>
                  <span className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                    #{orderId.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300">Total Amount</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ₹{orderAmount.toFixed(2)}
                  </span>
                </div>
                {expectedDelivery && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300 flex items-center gap-2">
                      {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V8a1 1 0 00-1-1"
                        />
                      </svg> */}
                      Expected Delivery
                    </span>
                    <span className="text-white font-medium">{expectedDelivery}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Payment Details</h2>
                  <p className="text-gray-400 text-sm">Transaction information</p>
                </div>
              </div>

              <div className="space-y-4">
                {referenceId && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Reference ID</span>
                    <span className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">{referenceId}</span>
                  </div>
                )}
                {transactionStatus && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Transaction Status</span>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(transactionStatus)}`}
                    >
                      {transactionStatus}
                    </span>
                  </div>
                )}
                {paymentMode && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Payment Method</span>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPaymentModeIcon(paymentMode)}</span>
                      <span className="text-white font-medium capitalize">{paymentMode.replace(/_/g, " ")}</span>
                    </div>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Security
                  </span>
                  <span className="text-green-300 font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Order Items</h2>
                  <p className="text-gray-400 text-sm">{orderItems.length} items in your order</p>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                {orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-medium">{item.name || "Product Item"}</p>
                        <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    ₹{orderAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              onClick={() => navigate("/")}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Continue Shopping
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              View Orders
            </button>
          </div>

          {/* Success Message */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Order confirmation sent to your email
            </div>
          </div>
        </div>
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
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  )
}

export default PaymentStatus



// import { useEffect, useState } from "react"
// import { useSearchParams, useNavigate } from "react-router-dom"
// import axios from "axios"
// import { getCookie } from "../utils/cookie"
// import { useCart } from "../context/CartContext"

// const PaymentStatus = () => {
//   const [searchParams] = useSearchParams()
//   const [orderId, setOrderId] = useState("")
//   const [orderItems, setOrderItems] = useState([])
//   const [orderAmount, setOrderAmount] = useState(0)
//   const [expectedDelivery, setExpectedDelivery] = useState("")
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const navigate = useNavigate()
//   const userId = getCookie("userId")
//   const { cartCount, setCartCount } = useCart()
//   const [ referenceId, setReferenceId ] = useState("")
//   const [ transactionStatus, setTransactionStatus ] = useState("");
//   const [ paymentMode, setPaymentMode ] = useState("")

//   useEffect(() => {
//     const fetchData = async () => {
//       const orderId = searchParams.get("orderId");
//       setOrderId(orderId || "Unavailable");

//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/getPaymentStatus/${orderId}`);
//         console.log("Order status in frontend:", response.data);

//         setReferenceId(response.data.referenceId);
//         setTransactionStatus(response.data.transactionStatus);
//         setPaymentMode(response.data.paymentMode);
//       } catch (err) {
//         console.error("Error fetching payment status:", err);
//       }

//       if (orderId) {
//         console.log("Fetching order details for orderId:", orderId, "and userId:", userId);

//         try {
//           const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orderById/${userId}/${orderId}`);
//           const order = res.data.order;

//           console.log("Order details fetched:", order);
//           setOrderItems(order.products || []);
//           setExpectedDelivery(order.expectedDelivery?.split("T")[0] || "");
//           setOrderAmount(order.totalAmount || 0);
//           setCartCount(0);
//           setLoading(false);
//           setShowConfetti(true);
//           setTimeout(() => setShowConfetti(false), 3000);
//         } catch (err) {
//           console.error("Failed to fetch order details:", err);
//           setError("Failed to load order details.");
//           setLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [searchParams, userId, setCartCount]);


//   useEffect(() => {
//     console.log("Order Items : ", orderItems)
//     console.log("Amount : ", orderAmount)
//   }, [orderItems, orderAmount])

//   if (loading) {
//     return (
//       <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-white text-lg">Processing your order...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center px-4">
//         <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-8 text-center max-w-md">
//           <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </div>
//           <h2 className="text-xl font-bold text-white mb-2">Error</h2>
//           <p className="text-gray-400 mb-6">{error}</p>
//           <button
//             onClick={() => navigate("/")}
//             className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
//           >
//             Go Home
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
//       </div>

//       {/* Confetti Animation */}
//       {showConfetti && (
//         <div className="fixed inset-0 pointer-events-none z-50">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-confetti"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 3}s`,
//                 animationDuration: `${3 + Math.random() * 2}s`,
//               }}
//             />
//           ))}
//         </div>
//       )}

//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
//         <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 w-full max-w-4xl">
//           {/* Success Header */}
//           <div className="text-center mb-12">
//             <div className="relative inline-block mb-6">
//               <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
//                 <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
//                 <span className="text-lg">🎉</span>
//               </div>
//             </div>
//             <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
//               Payment Successful!
//             </h1>
//             <p className="text-xl text-gray-300 max-w-2xl mx-auto">
//               Your order has been placed successfully. Thank you for shopping with us!
//             </p>
//             <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto mt-6 rounded-full"></div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             {/* Order Summary */}
//             <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Order Summary</h2>
//                   <p className="text-gray-400 text-sm">Your purchase details</p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                   <span className="text-gray-300">Order ID</span>
//                   <span className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
//                     #{orderId.slice(-8).toUpperCase()}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                   <span className="text-gray-300">Total Amount</span>
//                   <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
//                     ₹{orderAmount.toFixed(2)}
//                   </span>
//                 </div>
//                 {expectedDelivery && (
//                   <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
//                     <span className="text-gray-300 flex items-center gap-2">
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7a1 1 0 00-1 1v9a1 1 0 001 1h6a1 1 0 001-1V8a1 1 0 00-1-1"
//                         />
//                       </svg>
//                       Expected Delivery
//                     </span>
//                     <span className="text-white font-medium">{expectedDelivery}</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Order Items */}
//             <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <h2 className="text-xl font-bold text-white">Order Items</h2>
//                   <p className="text-gray-400 text-sm">{orderItems.length} items in your order</p>
//                 </div>
//               </div>

//               <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
//                 {orderItems.map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
//                   >
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
//                         <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                           <path
//                             fillRule="evenodd"
//                             d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                       <div>
//                         <p className="text-white font-medium">{item.name || "Product Item"}</p>
//                         <p className="text-gray-400 text-sm">Quantity: {item.quantity}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 pt-4 border-t border-white/20">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-semibold text-white">Total</span>
//                   <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
//                     ₹{orderAmount.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
//             <button
//               onClick={() => navigate("/")}
//               className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//             >
//               <svg
//                 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                 />
//               </svg>
//               Continue Shopping
//             </button>
//             <button
//               onClick={() => navigate("/orders")}
//               className="group inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
//             >
//               <svg
//                 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//               View Orders
//             </button>
//           </div>

//           {/* Success Message */}
//           <div className="mt-8 text-center">
//             <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               Order confirmation sent to your email
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.1);
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #8b5cf6, #3b82f6);
//           border-radius: 3px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #7c3aed, #2563eb);
//         }
//         .custom-scrollbar {
//           scrollbar-width: thin;
//           scrollbar-color: #8b5cf6 rgba(255, 255, 255, 0.1);
//         }
//         @keyframes confetti {
//           0% {
//             transform: translateY(-100vh) rotate(0deg);
//             opacity: 1;
//           }
//           100% {
//             transform: translateY(100vh) rotate(720deg);
//             opacity: 0;
//           }
//         }
//         .animate-confetti {
//           animation: confetti linear infinite;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default PaymentStatus




// import { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import Loader from "../components/Loader";
// import axios from "axios";
// import {
//   CheckCircleIcon,
//   HomeIcon,
//   CubeIcon,
//   CalendarIcon,
//   ShoppingBagIcon,
// } from "@heroicons/react/24/outline";
// import { getCookie } from '../utils/cookie';
// import {useCart} from '../context/CartContext';

// const PaymentSuccess = () => {

//   const [searchParams] = useSearchParams();
//   const [orderId, setOrderId] = useState("");
//   const [orderItems, setOrderItems] = useState([]);
//   const [orderAmount, setOrderAmount] = useState(0);
//   const [expectedDelivery, setExpectedDelivery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const userId = getCookie('userId');
//   const { cartCount, setCartCount } = useCart();


//   useEffect(() => {
//     const orderId = searchParams.get("orderId");
//     setOrderId(orderId || "Unavailable");

//     if (orderId) {
//       console.log("Fetching order details for orderId:", orderId, "and userId:", userId);
//       axios
//         .get(`${import.meta.env.VITE_API_BASE_URL}/api/orderById/${userId}/${orderId}`)
//         .then((res) => {
//           const order = res.data.order;
//           console.log("Order details fetched:", res.data);
//           setOrderItems(order.products || []);
//           setExpectedDelivery(order.expectedDelivery?.split("T")[0] || "");
//           setOrderAmount(order.totalAmount || 0);
//           setCartCount(0);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch order details:", err);
//           setError("Failed to load order details.");
//           setLoading(false);
//         })
//     }
//   }, []);

//   useEffect(() => {
//     console.log("Order Items : ", orderItems);
//     console.log("Amount : ", orderAmount);
//   },
//   [orderItems]);

//   return (
//     loading ? <Loader /> :
//     <div className="min-h-screen min-w-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-4 py-12">
//       <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 w-full max-w-2xl text-center animate-fade-in-down">
//         <CheckCircleIcon className="w-24 h-24 text-green-500 mx-auto mb-6" />
//         <h1 className="text-4xl font-extrabold text-green-700 mb-2">Payment Successful</h1>
//         <p className="text-gray-600 mb-6">Your order has been placed successfully. Thank you for shopping with us!</p>

//         <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-left mb-6">
//           <div className="mb-4">
//             <h2 className="text-lg font-semibold text-green-700 flex items-center mb-2">
//               <CubeIcon className="h-5 w-5 mr-2" />
//               Order Details
//             </h2>
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">Order ID:</span> {orderId}
//             </p>
//             <p className="text-sm text-gray-700">
//               <span className="font-medium">Order Amount:</span> ₹{orderAmount.toFixed(2)}
//             </p>
//             {expectedDelivery && (
//               <p className="text-sm text-gray-700 flex items-center mt-1">
//                 <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
//                 Expected Delivery: <strong className="ml-1">{expectedDelivery}</strong>
//               </p>
//             )}
//           </div>

//           <div>
//             <h3 className="text-md font-semibold text-green-700 flex items-center mb-3">
//               <ShoppingBagIcon className="h-5 w-5 mr-2" />
//               Items in Your Order
//             </h3>
//             <ul className="divide-y divide-gray-200">
//               {orderItems.map((item, index) => (
//                 <li key={index} className="py-2 flex justify-between text-sm text-gray-700">
//                   <span>{item.name} × {item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between font-semibold text-gray-800">
//               <span>Total</span>
//               <span>₹{orderAmount.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/")}
//           className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition duration-200"
//         >
//           <HomeIcon className="h-5 w-5" />
//           Go to Homepage
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;
