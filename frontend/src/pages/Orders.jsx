import React, {useEffect, useState} from 'react'
// import './styles/Orders.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getCookie } from '../utils/cookie';

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = getCookie('userId');

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  useEffect(() => {
    // Simulate fetching orders from an API
    const fetchOrders = async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order/${userId}`);
      if (!response.data || !Array.isArray(response.data)) {
        console.error('Invalid order data received:', response.data);
        return;
      }
      console.log('Fetched orders:', response.data);
      setOrders(response.data);
    };
    fetchOrders();
  }, [userId]);

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen min-w-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-md text-gray-700 bg-white"
          >
            <option value="all">All Orders</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            {filteredOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`cursor-pointer p-4 rounded-lg bg-white shadow hover:shadow-lg transition ${
                  selectedOrder?.id === order.id ? 'border-2 border-blue-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  <span className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>{order.items.length} items</p>
                  <p className="font-bold text-gray-800">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <div className="col-span-2 bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Order Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="text-gray-400">Order Number</p>
                    <p>{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Date</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <p>{selectedOrder.status}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Payment Method</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <p className="font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        <p className="text-sm text-gray-700 font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Shipping Address</h3>
                <p className="text-sm text-gray-600 leading-tight">
                  {selectedOrder.shippingAddress.street}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}
                </p>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Tracking</h3>
                  <p className="text-sm text-gray-600">Tracking Number: {selectedOrder.trackingNumber}</p>
                  <button className="mt-2 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded">
                    Track Package
                  </button>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Order Summary</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Subtotal</p>
                  <p>${selectedOrder.total.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-base font-bold text-gray-800 mt-2">
                  <p>Total</p>
                  <p>${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;