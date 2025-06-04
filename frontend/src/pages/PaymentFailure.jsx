import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { getCookie } from "../utils/cookie"
import { useCart } from "../context/CartContext"

const PaymentFailure = () => {
  const [searchParams] = useSearchParams()
  const [orderId, setOrderId] = useState("")
  const [orderItems, setOrderItems] = useState([])
  const [orderAmount, setOrderAmount] = useState(0)
  const [errorMessage, setErrorMessage] = useState("Your payment could not be processed")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const userId = getCookie("userId")
  const { cartCount } = useCart()

  useEffect(() => {
    const orderId = searchParams.get("orderId")
    const errorMsg = searchParams.get("error") || "Your payment could not be processed"

    setOrderId(orderId || "Unavailable")
    setErrorMessage(errorMsg)

    if (orderId) {
      // Try to fetch order details if available
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/api/orderById/${userId}/${orderId}`)
        .then((res) => {
          const order = res.data.order
          console.log("Order details fetched:", res.data)
          setOrderItems(order.products || [])
          setOrderAmount(order.totalAmount || 0)
          setLoading(false)
        })
        .catch((err) => {
          console.error("Failed to fetch order details:", err)
          setLoading(false)
        })
    } else {
      // If no order ID, just show the error page
      setLoading(false)
    }
  }, [searchParams, userId])

  const handleRetryPayment = () => {
    navigate("/checkout")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading payment information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 md:p-12 w-full max-w-4xl">
          {/* Failure Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-2xl">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-lg">❗</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Payment Failed
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{errorMessage}</p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
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
                  <h2 className="text-xl font-bold text-white">Order Information</h2>
                  <p className="text-gray-400 text-sm">Details of your attempted purchase</p>
                </div>
              </div>

              <div className="space-y-4">
                {orderId !== "Unavailable" && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Order ID</span>
                    <span className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">
                      #{orderId.slice(-8).toUpperCase()}
                    </span>
                  </div>
                )}
                {orderAmount > 0 && (
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-300">Total Amount</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                      ₹{orderAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Payment Status
                  </span>
                  <span className="text-red-300 font-medium">Failed</span>
                </div>
              </div>
            </div>

            {/* Error Details */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">What Happened?</h2>
                  <p className="text-gray-400 text-sm">Common reasons for payment failure</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Card Issues</p>
                      <p className="text-gray-400 text-sm">Insufficient funds or card restrictions</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Security Verification</p>
                      <p className="text-gray-400 text-sm">3D secure authentication failed</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium">Technical Issue</p>
                      <p className="text-gray-400 text-sm">Payment gateway or network error</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Need Help?</span>
                  <a
                    href="mailto:support@shopnexus.com"
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              onClick={handleRetryPayment}
              className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-2xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry Payment
            </button>
            <button
              onClick={() => navigate("/cart")}
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Return to Cart
            </button>
          </div>

          {/* Support Information */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-gray-300 px-4 py-2 rounded-full border border-white/20">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>If you were charged, the amount will be refunded within 5-7 business days</span>
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
          background: linear-gradient(to bottom, #f59e0b, #ef4444);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f97316, #dc2626);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #f59e0b rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  )
}

export default PaymentFailure
