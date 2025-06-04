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
          <Route path="/" element={!isAuthenticated ? <Landing /> : <Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />} />
          <Route path="/create-account" element={isAuthenticated ? <Register /> : <Navigate to="/" replace />} />
          <Route path="/cart" element={isAuthenticated ? <Cart /> : <Navigate to="/" replace />} />
          <Route path="/orders" element={isAuthenticated ? <Orders /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" replace />} />
          <Route path="/checkout" element={isAuthenticated ? <Checkout /> : <Navigate to="/" replace />} />
          <Route path="/payment-status" element={<PaymentStatus />} />
          <Route path="/search" element={isAuthenticated ? <SearchResults /> : <Navigate to="/" replace />} />
          <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
