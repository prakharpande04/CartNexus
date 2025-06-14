import './App.css';
import { useEffect } from 'react';
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
import TermsAndConditions from './pages/TermsAndConditions';
import ContactUs from './pages/ContactUs';
import axios from 'axios';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};

function App() {
  const { isAuthenticated } = useAuth0(); // ✅ Move it here

  useEffect(() => {
    const warmUp = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/`);
        console.log("Warm Up Response:", res.data);
      } catch (err) {
        console.error("Warm Up Failed:", err);
      }
    };

    warmUp();
  }, []);

  return (
    <>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PublicRoute element={<Landing />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/create-account" element={<ProtectedRoute element={<Register />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/checkout" element={<ProtectedRoute element={<Checkout />} />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/search" element={<ProtectedRoute element={<SearchResults />} />} />

          {/* ✅ Catch-all route with proper isAuthenticated check */}
          <Route
            path="*"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;