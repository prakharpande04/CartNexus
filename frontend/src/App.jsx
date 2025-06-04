import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import PaymentStatus from './pages/PaymentStatus';
import SearchResults from './pages/SearchResults';

function App() {
  const { isAuthenticated } = useAuth0(); // ✅ Move it here

  return (
    <>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-account" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
