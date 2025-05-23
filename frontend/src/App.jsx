import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from './components/Navbar'
import axios from 'axios';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const PublicRoute = ({ element }) => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? element : <Navigate to="/dashboard" />;
};

function App() {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async() => {
      if (isAuthenticated && user){
        const userData = {
          uid: user.sub,
          email: user.email,
          name: user.name,
          photo: user.picture
        };

        try{
          const response = await axios.post('https://backend-snowy-mu.vercel.app/user', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          console.log('User data sent successfully:', response.data);
          navigate('/dashboard');
        }
        catch (error) {
          console.error('Error sending user data:', error);
        }
      }
    };

    getUserData();
  }, [isAuthenticated, user]);

  return (
    <>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<PublicRoute element={<Landing />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
          <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        </Routes>
      </div>
    </>
  );
}

export default App
