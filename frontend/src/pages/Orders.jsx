import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCookie } from '../utils/cookie';
import axios from 'axios';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = getCookie('userId');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${userId}`);
      if (!response.data.orders || !Array.isArray(response.data.orders)) {
        console.error('Invalid order data received:', response.data);
        return;
      }
      setOrders(response.data.orders);
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="min-h-screen min-w-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155] text-white py-6 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-300 drop-shadow-md">My Orders</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div
            className={`space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar
              ${selectedOrder ? 'lg:max-h-[75vh]' : 'max-h-[75vh]'}
            `}
          >
            {orders.map((order) => (
              <div
                key={order.orderId}
                onClick={() => setSelectedOrder(order)}
                className={`cursor-pointer p-4 sm:p-5 backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] duration-300 ${
                  selectedOrder?.orderId === order.orderId
                    ? 'ring-2 ring-cyan-400 bg-cyan-600/10'
                    : 'border-transparent'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-cyan-300">
                      Order #{order.orderId.slice(0, 25)}...
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">Placed on {order.createdAt.split('T')[0]}</p>
                  </div>
                </div>
                <div className="flex justify-between text-xs sm:text-sm text-gray-300">
                  <span>{order.products.length} items</span>
                  <span className="font-semibold text-cyan-200">₹{order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details for large screens */}
          {selectedOrder && (
            <div className="hidden lg:block col-span-2 backdrop-blur-md bg-white/5 border border-cyan-400/30 rounded-xl shadow-lg p-6 max-h-[75vh] overflow-y-auto">
              <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
            </div>
          )}
        </div>
      </div>

      {/* Order Details as modal for small screens */}
      {selectedOrder && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex flex-col p-6 overflow-y-auto z-50">
          <div className="relative bg-[#0f172a] rounded-xl shadow-lg max-h-full overflow-y-auto">
            <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </div>
        </div>
      )}

      {/* Scrollbar Hider */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
          .custom-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
}

// Extracted order details as a subcomponent
function OrderDetails({ order, onClose }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6 px-2 sm:px-0">
        <h2 className="text-xl sm:text-2xl font-bold text-cyan-200">Order Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-500 text-3xl leading-none"
          aria-label="Close order details"
        >
          &times;
        </button>
      </div>

      {/* Order Info */}
      <div className="mb-6 px-2 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Order Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
          <div>
            <p className="text-gray-500">Order Number</p>
            <p>{order.orderId}</p>
          </div>
          <div>
            <p className="text-gray-500">Date</p>
            <p>{order.createdAt.split('T')[0]}</p>
          </div>
          <div>
            <p className="text-gray-500">Status</p>
            <p>{order.paymentStatus}</p>
          </div>
          <div>
            <p className="text-gray-500">Expected Delivery</p>
            <p>{order.expectedDelivery}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-6 px-2 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-200 mb-3">Items</h3>
        <div className="space-y-4">
          {order.products?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="border-t border-cyan-500/20 pt-4 px-2 sm:px-0">
        <h3 className="text-lg font-semibold text-gray-200 mb-2">Order Summary</h3>
        <div className="text-sm text-gray-300 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>₹40</span>
          </div>
          <div className="flex justify-between font-bold text-cyan-200 pt-2 border-t border-cyan-400/20 mt-2">
            <span>Total</span>
            <span>₹{order.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;




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