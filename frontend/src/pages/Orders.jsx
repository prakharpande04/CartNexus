import { useEffect, useState } from "react"
import "@fortawesome/fontawesome-free/css/all.min.css"
import { getCookie } from "../utils/cookie"
import axios from "axios"

function Orders() {
  const [orders, setOrders] = useState([])
  const userId = getCookie("userId")
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${userId}`)
      if (!response.data.orders || !Array.isArray(response.data.orders)) {
        console.error("Invalid order data received:", response.data)
        return
      }
      setOrders(response.data.orders)
    }
    fetchOrders()
  }, [userId])

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
      case "pending":
      case "processing":
        return "bg-amber-500/20 text-amber-300 border-amber-500/30"
      case "shipped":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30"
      case "cancelled":
        return "bg-red-500/20 text-red-300 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30"
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "delivered":
        return "fas fa-check-circle"
      case "pending":
      case "processing":
        return "fas fa-clock"
      case "shipped":
        return "fas fa-truck"
      case "cancelled":
        return "fas fa-times-circle"
      default:
        return "fas fa-box"
    }
  }

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <i className="fas fa-shopping-bag text-white text-2xl"></i>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-2">
            My Orders
          </h1>
          <p className="text-gray-400 text-lg">Track and manage your purchases</p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Orders List */}
          <div className={`${selectedOrder ? "xl:col-span-5" : "xl:col-span-12"} transition-all duration-500`}>
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                  <i className="fas fa-list text-purple-400"></i>
                  Order History
                </h2>
                <div className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  {orders.length} Orders
                </div>
              </div>

              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <i className="fas fa-box-open text-6xl text-gray-600 mb-4"></i>
                    <p className="text-gray-400 text-lg">No orders found</p>
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <div
                      key={order.orderId}
                      onClick={() => setSelectedOrder(order)}
                      className={`group cursor-pointer p-5 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
                        selectedOrder?.orderId === order.orderId
                          ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-2 border-purple-400/50 shadow-purple-500/25"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-400/30"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                              <i className="fas fa-receipt text-white text-sm"></i>
                            </div>
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-purple-200 transition-colors">
                                #{order.orderId.slice(-8).toUpperCase()}
                              </h3>
                              <p className="text-xs text-gray-400 flex items-center gap-1">
                                <i className="fas fa-calendar-alt"></i>
                                {order.createdAt.split("T")[0]}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.paymentStatus)}`}
                        >
                          <i className={`${getStatusIcon(order.paymentStatus)} mr-1`}></i>
                          {order.paymentStatus}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <i className="fas fa-box text-purple-400"></i>
                            <span>{order.products.length} items</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-white">₹{order.totalAmount.toFixed(2)}</p>
                          <p className="text-xs text-gray-400">Total Amount</p>
                        </div>
                      </div>

                      {/* Progress indicator */}
                      <div className="mt-4 w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            order.paymentStatus === "completed"
                              ? "w-full bg-gradient-to-r from-emerald-500 to-green-400"
                              : order.paymentStatus === "pending"
                                ? "w-1/3 bg-gradient-to-r from-amber-500 to-yellow-400"
                                : "w-2/3 bg-gradient-to-r from-blue-500 to-cyan-400"
                          }`}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Order Details for large screens */}
          {selectedOrder && (
            <div className="hidden xl:block xl:col-span-7 transition-all duration-500">
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
                <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Details as modal for small screens */}
      {selectedOrder && (
        <div className="xl:hidden fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </div>
        </div>
      )}

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

// Enhanced OrderDetails component
function OrderDetails({ order, onClose }) {
  return (
    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            Order Details
          </h2>
          <p className="text-gray-400 mt-1">#{order.orderId}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          aria-label="Close order details"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Status Banner */}
      <div
        className={`p-4 rounded-xl mb-8 border ${order.paymentStatus === "completed" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-amber-500/10 border-amber-500/30"}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${order.paymentStatus === "completed" ? "bg-emerald-500/20" : "bg-amber-500/20"}`}
          >
            <i
              className={`fas ${order.paymentStatus === "completed" ? "fa-check-circle text-emerald-400" : "fa-clock text-amber-400"} text-xl`}
            ></i>
          </div>
          <div>
            <h3
              className={`font-semibold ${order.paymentStatus === "completed" ? "text-emerald-300" : "text-amber-300"}`}
            >
              Payment {order.paymentStatus}
            </h3>
            <p className="text-sm text-gray-400">
              {order.paymentStatus === "completed" ? "Your order has been confirmed" : "Payment is being processed"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-info-circle text-blue-400"></i>
            Order Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order Number</p>
              <p className="text-white font-mono text-sm bg-white/10 px-2 py-1 rounded">{order.orderId.slice(0,28)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order Date</p>
              <p className="text-gray-300 flex items-center gap-2">
                <i className="fas fa-calendar text-purple-400"></i>
                {order.createdAt.split("T")[0]}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Payment Status</p>
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${order.paymentStatus === "completed" ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" : "bg-amber-500/20 text-amber-300 border-amber-500/30"}`}
              >
                <i className={`fas ${order.paymentStatus === "completed" ? "fa-check-circle" : "fa-clock"}`}></i>
                {order.paymentStatus}
              </div>
            </div>
            {order.expectedDelivery && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Expected Delivery</p>
                <p className="text-gray-300 flex items-center gap-2">
                  <i className="fas fa-truck text-green-400"></i>
                  {order.expectedDelivery.split('T')[0]}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <i className="fas fa-box text-purple-400"></i>
            Order Items
          </h3>
          <div className="space-y-3">
            {order.products?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-cube text-white text-sm"></i>
                  </div>
                  <div>
                    <p className="text-white font-medium">Product Item</p>
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      <i className="fas fa-hashtag text-xs"></i>
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-calculator text-green-400"></i>
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-2">
              <i className="fas fa-shopping-cart text-sm"></i>
              Subtotal
            </span>
            <span className="font-medium">₹{order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-gray-300">
            <span className="flex items-center gap-2">
              <i className="fas fa-truck text-sm"></i>
              Shipping
            </span>
            <span className="font-medium">₹40.00</span>
          </div>
          <div className="border-t border-white/20 pt-3 mt-3">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-white flex items-center gap-2">
                <i className="fas fa-receipt"></i>
                Total
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders





// import React, { useEffect, useState } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { getCookie } from '../utils/cookie';
// import axios from 'axios';

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const userId = getCookie('userId');
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${userId}`);
//       if (!response.data.orders || !Array.isArray(response.data.orders)) {
//         console.error('Invalid order data received:', response.data);
//         return;
//       }
//       setOrders(response.data.orders);
//     };
//     fetchOrders();
//   }, [userId]);

//   return (
//     <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-6 px-4 sm:px-10">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-300 drop-shadow-md">My Orders</h1>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Orders List */}
//           <div
//             className={`space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar
//               ${selectedOrder ? 'lg:max-h-[75vh]' : 'max-h-[75vh]'}
//             `}
//           >
//             {orders.map((order) => (
//               <div
//                 key={order.orderId}
//                 onClick={() => setSelectedOrder(order)}
//                 className={`cursor-pointer p-4 sm:p-5 backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] duration-300 ${
//                   selectedOrder?.orderId === order.orderId
//                     ? 'ring-2 ring-cyan-400 bg-cyan-600/10'
//                     : 'border-transparent'
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-1">
//                   <div>
//                     <h3 className="text-base sm:text-lg font-semibold text-cyan-300">
//                       Order #{order.orderId.slice(0, 25)}...
//                     </h3>
//                     <p className="text-xs sm:text-sm text-gray-400">Placed on {order.createdAt.split('T')[0]}</p>
//                   </div>
//                 </div>
//                 <div className="flex justify-between text-xs sm:text-sm text-gray-300">
//                   <span>{order.products.length} items</span>
//                   <span className="font-semibold text-cyan-200">₹{order.totalAmount.toFixed(2)}</span>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Details for large screens */}
//           {selectedOrder && (
//             <div className="hidden lg:block col-span-2 backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-xl shadow-lg p-6 max-h-[75vh] overflow-y-auto">
//               <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Details as modal for small screens */}
//       {selectedOrder && (
//         <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col p-6 overflow-y-auto z-50">
//           <div className="relative bg-[#0f172a] rounded-xl shadow-lg max-h-full overflow-y-auto">
//             <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
//           </div>
//         </div>
//       )}

//       {/* Scrollbar Hider */}
//       <style>
//         {`
//           .custom-scrollbar::-webkit-scrollbar {
//             width: 0px;
//             background: transparent;
//           }
//           .custom-scrollbar {
//             -ms-overflow-style: none;
//             scrollbar-width: none;
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// // Extracted order details as a subcomponent
// function OrderDetails({ order, onClose }) {
//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
//         <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">Order Details</h2>
//         <button
//           onClick={onClose}
//           className="text-gray-400 hover:text-red-500 text-3xl leading-none"
//           aria-label="Close order details"
//         >
//           &times;
//         </button>
//       </div>

//       {/* Order Info */}
//       <div className="mb-6 px-2 sm:px-0">
//         <h3 className="text-lg font-semibold text-gray-200 mb-2">Order Information</h3>
//         <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
//           <div>
//             <p className="text-gray-500">Order Number</p>
//             <p>{order.orderId}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Date</p>
//             <p>{order.createdAt.split('T')[0]}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Status</p>
//             <p>{order.paymentStatus}</p>
//           </div>
//           <div>
//             <p className="text-gray-500">Expected Delivery</p>
//             <p>{order.expectedDelivery}</p>
//           </div>
//         </div>
//       </div>

//       {/* Items */}
//       <div className="mb-6 px-2 sm:px-0">
//         <h3 className="text-lg font-semibold text-gray-200 mb-3">Items</h3>
//         <div className="space-y-4">
//           {order.products?.map((item, idx) => (
//             <div key={idx} className="flex items-center gap-4">
//               <div>
//                 <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="border-t border-cyan-500/20 pt-4 px-2 sm:px-0">
//         <h3 className="text-lg font-semibold text-gray-200 mb-2">Order Summary</h3>
//         <div className="text-sm text-gray-300 space-y-2">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>₹{order.totalAmount.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Shipping</span>
//             <span>₹40</span>
//           </div>
//           <div className="flex justify-between font-bold text-cyan-200 pt-2 border-t border-cyan-400/20 mt-2">
//             <span>Total</span>
//             <span>₹{order.totalAmount.toFixed(2)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Orders;




// import React, {useEffect, useState} from 'react'
// // import './styles/Orders.css'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { getCookie } from '../utils/cookie';
// import axios from 'axios';

// function Orders() {
//   const [orders, setOrders] = useState([]);
//   const userId = getCookie('userId');

//   const [selectedOrder, setSelectedOrder] = useState(null);
//   // const [filter, setFilter] = useState('all');

//   // const getStatusColor = (status) => {
//   //   switch (status.toLowerCase()) {
//   //     case 'delivered': return 'bg-green-500';
//   //     case 'processing': return 'bg-yellow-500';
//   //     case 'shipped': return 'bg-blue-500';
//   //     case 'cancelled': return 'bg-red-500';
//   //     default: return 'bg-gray-500';
//   //   }
//   // };

//   useEffect(() => {
//     // Simulate fetching orders from an API
//     const fetchOrders = async () => {
//       const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${userId}`);
//       if (!response.data.orders || !Array.isArray(response.data.orders)) {
//         console.error('Invalid order data received:', response.data);
//         return;
//       }
//       console.log('Fetched orders:', response.data);
//       setOrders(response.data.orders);
//     };
//     fetchOrders();
//   }, [userId]);

//   // const filteredOrders = orders.filter(order => {
//   //   if (filter === 'all') return true;
//   //   return order.status.toLowerCase() === filter.toLowerCase();
//   // });

//   return (
//     <div className="min-h-screen min-w-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
//           {/* <select 
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="px-4 py-2 border rounded-md text-gray-700 bg-white"
//           >
//             <option value="all">All Orders</option>
//             <option value="processing">Processing</option>
//             <option value="shipped">Shipped</option>
//             <option value="delivered">Delivered</option>
//             <option value="cancelled">Cancelled</option>
//           </select> */}
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="space-y-4">
//             {orders.map(order => (
//               <div 
//                 key={order.orderId}
//                 onClick={() => setSelectedOrder(order)}
//                 className={`cursor-pointer p-4 rounded-lg bg-white shadow hover:shadow-lg transition ${
//                   selectedOrder?.orderId === order.orderId ? 'border-2 border-blue-500' : ''
//                 }`}
//               >
//                 <div className="flex justify-between items-start mb-2">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
//                     <p className="text-sm text-gray-500">Placed on {order.createdAt.split('T')[0]}</p>
//                   </div>
//                   {/* <span className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>   
//                     {order.status}
//                   </span> */}
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <p>{order.products.length} items</p>
//                   <p className="font-bold text-gray-800">${order.totalAmount.toFixed(2)}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {selectedOrder && (
//             <div className="col-span-2 bg-white rounded-lg p-6 shadow">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
//                 <button onClick={() => setSelectedOrder(null)} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-700">Order Information</h3>
//                 <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                   <div>
//                     <p className="text-gray-400">Order Number</p>
//                     <p>{selectedOrder.orderId}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Date</p>
//                     <p>{selectedOrder.createdAt.split('T')[0]}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Status</p>
//                     <p>{selectedOrder.paymentStatus}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400">Expected Delivery Date</p>
//                     <p>{selectedOrder.expectedDelivery}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-700">Items</h3>
//                 <div className="space-y-4">
//                   {selectedOrder.procucts.map(item => (
//                     <div key={item.product} className="flex items-center gap-4">
//                       {/* <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" /> */}
//                       <div>
//                         {/* <p className="font-semibold text-gray-800">{item.name}</p> */}
//                         <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
//                         {/* <p className="text-sm text-gray-700 font-bold">${item.price.toFixed(2)}</p> */}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* <div className="mb-6">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-700">Shipping Address</h3>
//                 <p className="text-sm text-gray-600 leading-tight">
//                   {selectedOrder.shippingAddress.street}<br />
//                   {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
//                 </p>
//               </div>

//               {selectedOrder.trackingNumber && (
//                 <div className="mb-6">
//                   <h3 className="text-lg font-semibold mb-2 text-gray-700">Tracking</h3>
//                   <p className="text-sm text-gray-600">Tracking Number: {selectedOrder.trackingNumber}</p>
//                   <button className="mt-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded">
//                     Track Package
//                   </button>
//                 </div>
//               )} */}

//               <div className="border-t pt-4">
//                 <h3 className="text-lg font-semibold mb-2 text-gray-700">Order Summary</h3>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <p>Subtotal</p>
//                   <p>₹{selectedOrder.totalAmount.toFixed(2)-40}</p>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-600">
//                   <p>Shipping</p>
//                   <p>₹40</p>
//                 </div>
//                 <div className="flex justify-between text-base font-bold text-gray-800 mt-2">
//                   <p>Total</p>
//                   <p>₹{selectedOrder.totalAmount.toFixed(2)}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Orders;