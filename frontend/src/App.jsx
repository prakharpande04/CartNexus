import './App.css'
import { Routes, Route, Navigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};

function App() {
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
          <Route path="/payment-success" element={<ProtectedRoute element={<PaymentSuccess />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
