import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "./../assets/logo.png";
import "./styles/Navbar.css";
import profileLogo from "./../assets/profile-logo.png";
import cartLogo from "./../assets/cart-logo.png";
import orderLogo from "./../assets/orders.png";
import categoriesLogo from "./../assets/categories.png";
import logoutLogo from "./../assets/logout.png";
import homeLogo from "./../assets/home.png";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";


function Navbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [navbarShadow, setNavbarShadow] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();
    
    console.log(user);

    const handleImageClick = () => {
        setShowLogout(!showLogout);
    };

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setNavbarShadow(true);
            } else {
                setNavbarShadow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar ${navbarShadow ? 'navbar-shadow' : ''}`}>
            <button className="menu-button" onClick={toggleMenu}>
                ☰
            </button>


            <div className="nav-logo">
                <img src={logo} alt="Logo" className="logo" />
                <p className="app-title"><a href='http://localhost:5173'>CartNexus</a></p>
            </div>


            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                />
                <button className="search-button">Search</button>
            </div>

            <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                {isAuthenticated ? (
                <>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={logout}
                >
                    <img src={logoutLogo} alt="LogoutLogo" />
                    <span className="text-xs">Logout</span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/profile')}
                >
                    <img src={profileLogo} alt={user.name} />
                    <span className="text-xs">My Account</span>
                </li>


                <li className="relative flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/cart')}
                >
                    <img src={cartLogo} alt="CartLogo" className="w-6 h-6" />
                    <span className="text-xs">Cart</span>

                    {/* Badge */}
                    <span className="absolute -top-1 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/orders')}
                >
                    <img src={orderLogo} alt="OrdersLogo" />
                    <span className="text-xs">Orders</span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer">
                    <img src={categoriesLogo} alt="CategoriesLogo" />
                    <span className="text-xs">Categories</span>
                </li>

                <li className="flex flex-col items-center justify-center text-gray-700 hover:text-black cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <img src={homeLogo} alt="HomeLogo" />
                    <span className="text-xs">Home</span>
                </li>

                </>
                
                ) : (
                <li className="navbar-item">
                    <button onClick={() => loginWithRedirect()} className="login-button">
                    Login
                    </button>
                </li>
                )}
            </ul>
        </div>
    );
}

export default Navbar;