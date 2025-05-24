import React, {useState} from 'react'
import './styles/Orders.css'

function Orders() {
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2024-02-15",
      status: "Delivered",
      total: 299.97,
      items: [
        {
          id: 1,
          name: "Premium Wireless Headphones",
          price: 199.99,
          quantity: 1,
          image: "https://via.placeholder.com/100"
        },
        {
          id: 2,
          name: "Wireless Earbuds",
          price: 99.98,
          quantity: 2,
          image: "https://via.placeholder.com/100"
        }
      ],
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001"
      },
      paymentMethod: "Credit Card",
      trackingNumber: "TRK123456789"
    },
    {
      id: "ORD002",
      date: "2024-02-10",
      status: "Processing",
      total: 149.99,
      items: [
        {
          id: 3,
          name: "Smart Fitness Watch",
          price: 149.99,
          quantity: 1,
          image: "https://via.placeholder.com/100"
        }
      ],
      shippingAddress: {
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zip: "10001"
      },
      paymentMethod: "PayPal",
      trackingNumber: null
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'processing':
        return '#ffc107';
      case 'shipped':
        return '#17a2b8';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <div className="orders-filter">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Orders</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="orders-content">
          <div className="orders-list">
            {filteredOrders.map(order => (
              <div 
                key={order.id} 
                className={`order-card ${selectedOrder?.id === order.id ? 'active' : ''}`}
                onClick={() => setSelectedOrder(order)}
              >
                <div className="order-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p>Placed on {order.date}</p>
                  </div>
                  <span 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="order-summary">
                  <p>{order.items.length} items</p>
                  <p className="order-total">${order.total.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {selectedOrder && (
            <div className="order-details">
              <div className="details-header">
                <h2>Order Details</h2>
                <button 
                  className="close-button"
                  onClick={() => setSelectedOrder(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="details-section">
                <h3>Order Information</h3>
                <div className="info-grid">
                  <div>
                    <p className="label">Order Number</p>
                    <p>{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="label">Order Date</p>
                    <p>{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="label">Status</p>
                    <p>{selectedOrder.status}</p>
                  </div>
                  <div>
                    <p className="label">Payment Method</p>
                    <p>{selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div className="details-section">
                <h3>Items</h3>
                <div className="items-list">
                  {selectedOrder.items.map(item => (
                    <div key={item.id} className="item-card">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="details-section">
                <h3>Shipping Address</h3>
                <div className="address-info">
                  <p>{selectedOrder.shippingAddress.street}</p>
                  <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}</p>
                </div>
              </div>

              {selectedOrder.trackingNumber && (
                <div className="details-section">
                  <h3>Tracking Information</h3>
                  <div className="tracking-info">
                    <p>Tracking Number: {selectedOrder.trackingNumber}</p>
                    <button className="track-button">
                      Track Package
                    </button>
                  </div>
                </div>
              )}

              <div className="order-summary-section">
                <h3>Order Summary</h3>
                <div className="summary-grid">
                  <div>
                    <p>Subtotal</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>Shipping</p>
                    <p>Free</p>
                  </div>
                  <div className="total">
                    <p>Total</p>
                    <p>${selectedOrder.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders