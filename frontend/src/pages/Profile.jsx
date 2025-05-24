import React, {useState} from 'react'
import './styles/Profile.css'

function Profile() {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: "https://via.placeholder.com/150",
    joinDate: "January 2024",
  });

  // Sample order history
  const [orders] = useState([
    {
      id: "ORD001",
      date: "2024-02-15",
      total: 299.97,
      status: "Delivered",
      items: 3
    },
    {
      id: "ORD002",
      date: "2024-02-10",
      total: 149.99,
      status: "Processing",
      items: 1
    }
  ]);

  // Sample saved addresses
  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      isDefault: false
    }
  ]);

  // Active tab state
  const [activeTab, setActiveTab] = useState('profile');

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Add your profile update logic here
    console.log("Profile updated");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="user-info">
            <div className="avatar">
              <img src={userData.avatar} alt="Profile" />
              <button className="change-avatar">Change Photo</button>
            </div>
            <h2>{userData.firstName} {userData.lastName}</h2>
            <p>Member since {userData.joinDate}</p>
          </div>
          <nav className="profile-nav">
            <button 
              className={activeTab === 'profile' ? 'active' : ''} 
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user"></i> Profile
            </button>
            <button 
              className={activeTab === 'orders' ? 'active' : ''} 
              onClick={() => setActiveTab('orders')}
            >
              <i className="fas fa-shopping-bag"></i> Orders
            </button>
            <button 
              className={activeTab === 'addresses' ? 'active' : ''} 
              onClick={() => setActiveTab('addresses')}
            >
              <i className="fas fa-map-marker-alt"></i> Addresses
            </button>
            <button 
              className={activeTab === 'settings' ? 'active' : ''} 
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i> Settings
            </button>
          </nav>
        </div>

        <div className="profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <h2>Personal Information</h2>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue={userData.firstName} />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue={userData.lastName} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue={userData.email} />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue={userData.phone} />
                  </div>
                </div>
                <button type="submit" className="save-button">Save Changes</button>
              </form>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="profile-section">
              <h2>Order History</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <h3>Order #{order.id}</h3>
                        <p>Placed on {order.date}</p>
                      </div>
                      <span className={`order-status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="order-details">
                      <p>{order.items} items</p>
                      <p className="order-total">${order.total.toFixed(2)}</p>
                    </div>
                    <button className="view-order">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="profile-section">
              <h2>Saved Addresses</h2>
              <div className="addresses-list">
                {addresses.map(address => (
                  <div key={address.id} className="address-card">
                    <div className="address-header">
                      <h3>{address.type}</h3>
                      {address.isDefault && <span className="default-badge">Default</span>}
                    </div>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zip}</p>
                    <div className="address-actions">
                      <button className="edit-address">Edit</button>
                      <button className="delete-address">Delete</button>
                      {!address.isDefault && (
                        <button className="set-default">Set as Default</button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="add-address">
                  <i className="fas fa-plus"></i> Add New Address
                </button>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="profile-section">
              <h2>Account Settings</h2>
              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Email Notifications</h3>
                    <p>Receive updates about your orders and promotions</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h3>Change Password</h3>
                    <p>Update your account password</p>
                  </div>
                  <button className="change-password">Change</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile